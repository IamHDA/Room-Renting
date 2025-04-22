import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../css/user-css/Chat.css';
import {faCamera, faEllipsisVertical, faMagnifyingGlass, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getImageMime} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import {getChatRooms, getMessages, getRecipient} from "../../apiServices/chat.js";
import SockJS from "sockjs-client";
import {Client} from '@stomp/stompjs';

const MyComponent = () => {
    const { user } = useContext(AuthContext);
    const {chatId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const postCreatorId = location.state?.userId;
    const fileInputRef = useRef(null);
    const messageEndRef = useRef(null);
    let recipientRef = useRef(null);
    let chatIdRef = useRef(chatId);
    let stompClientRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [pendingMessage, setPendingMessage] = useState("");
    const [virtualChatRoom, setVirtualChatRoom] = useState(false);
    // const [deleteConversation, setDeleteConversation] = useState(false);

    useEffect(() => {
        return () => {
            disconnectStomp();
            localStorage.removeItem("recipientId");
        }
    }, [])

    useEffect(() => {
        chatIdRef.current = chatId;
    }, [chatId]);


    useEffect(() => {
        fetchChatRoomMessage(chatId);
    }, [location]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if(user) stompClientRef.current = setUpStompClient();
        const fetchData = async () => {
            try {
                console.log(chatId);
                const tmpChatRooms = await fetchChatRooms();
                setChatRooms(tmpChatRooms);
                const savedRecipientId = localStorage.getItem("recipientId");
                if(savedRecipientId) {
                    await fetchChatRoomRecipient(savedRecipientId);
                    await fetchChatRoomMessage(chatId);
                }
                if(postCreatorId){
                    await fetchChatRoomRecipient(postCreatorId);
                    checkExistChatRooms(tmpChatRooms);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [user]);

    const setUpStompClient = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe(`/user/${user.id}/queue/messages`, onMessageReceived);
                stompClientRef.current = stompClient;
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });
        stompClient.activate();
        return stompClient;
    }

    const disconnectStomp = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate().then(() => {
                console.log('STOMP Client deactivated');
            });
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const onMessageReceived = async (payload) => {
        const message = JSON.parse(payload.body);
        if(message.chatId === chatIdRef.current) {
            console.log(true);
            setMessages((prev) => [...prev, message]);
        }
        const tmpChatRooms = await fetchChatRooms();
        setChatRooms(tmpChatRooms);
    }

    const sendMessage = async (e) => {
        if(pendingMessage.length === 0) {
            e.preventDefault();
        }
        const payload = {
            content: pendingMessage.trim(),
            recipientId: recipientRef.current.id,
            senderId: user.id,
            chatId: chatId
        }
        stompClientRef.current.publish({
            destination: "/app/chat",
            body: JSON.stringify(payload)
        })
        if(virtualChatRoom){
            setVirtualChatRoom(false);
            const tmpChatRooms = await fetchChatRooms();
            console.log(tmpChatRooms);
            navigate(`/chat/${user.id}_${recipientRef.current.id}`);
            setChatRooms(tmpChatRooms);
        }
        setMessages((prevMessages) => [...prevMessages, payload]);
        setPendingMessage("");
    }

    const checkExistChatRooms = (tmpChatRooms) => {
        const existChatRoom = tmpChatRooms.find(chatRoom => chatRoom.recipient.id === recipientRef.current.id);
        if(existChatRoom){
            setVirtualChatRoom(false);
            navigate(`/chat/${existChatRoom.chatId}`);
        }else{
            setVirtualChatRoom(true);
        }
    }

    const fetchChatRoomRecipient = async (recipientId) => {
        recipientRef.current = await getRecipient(recipientId);
        console.log(recipientRef.current);
    }

    const fetchChatRooms = async () => {
        return await getChatRooms();
    }

    const fetchChatRoomMessage = async (chatRoomId) => {
        const response = await getMessages(chatRoomId);
        setMessages(response);
    }

    return (
        <div className="chat-body">
            <div className="chat-container">
                <div className="left">
                    <div className="search-chat-room">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Tìm kiếm người dùng"/>
                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="chat-room-container">
                        {virtualChatRoom && recipientRef.current && (
                            <div className="chat-room-bounding" onClick={(e) => {
                                e.currentTarget.classList.add("isSelected");
                            }}>
                                <div className="img-container">
                                    <img src={`data:${getImageMime(recipientRef.current.avatar)};base64,${recipientRef.current.avatar}`} className="opponent-img"/>
                                    <div className={`status-dot ${recipientRef.current.status === "ONLINE" ? "online" : "offline"}`}></div>
                                </div>
                                <div className="opponent-name-message">
                                    <h2>{recipientRef.current.fullName}</h2>
                                </div>
                                <img src={`data:${getImageMime(recipientRef.current.avatar)};base64,${recipientRef.current.avatar}`} className="chat-post-img"/>
                            </div>
                        )}
                        {chatRooms.length > 0 && chatRooms.map((chatRoom, index) => (
                            <div className={`chat-room-bounding ${chatRoom.chatId === chatId ? "is-selected" : ""}`} key={index} onClick={() => {
                                recipientRef.current = chatRoom.recipient;
                                console.log(chatRoom.recipient.id);
                                localStorage.setItem("recipientId", String(chatRoom.recipient.id));
                                setVirtualChatRoom(false);
                                navigate(`/chat/${chatRoom.chatId}`);
                            }}>
                                <div className="img-container">
                                    <img src={`data:${getImageMime(chatRoom.recipient.avatar)};base64,${chatRoom.recipient.avatar}`} className="opponent-img"/>
                                    <div className={`status-dot ${chatRoom.recipient.status === "ONLINE" ? "online" : "offline"}`}></div>
                                </div>
                                <div className="opponent-name-message">
                                    <h2>{chatRoom.recipient.fullName}</h2>
                                </div>
                                {/*<img src={`data:${getImageMime(chatRoom.recipientRef.avatar)};base64,${chatRoom.recipientRef.avatar}`} className="chat-post-img"/>*/}
                            </div>
                        ))}
                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="delete-conversation">
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Xóa hội thoại</p>
                    </div>
                </div>
                <img src="../../../public/chat-icon/stand-line.png"/>
                {recipientRef.current && (
                    <div className="right">
                        <div className="chat-header">
                            <Link to={`/account/${recipientRef.id}`} className="opponent">
                                <div className="img-container">
                                    <img src={`data:${getImageMime(recipientRef.current.avatar)};base64,${recipientRef.current.avatar}`} className="opponent-img"/>
                                </div>
                                <div className="name-status">
                                    <h3>{recipientRef.current.fullName}</h3>
                                    <div className="status">
                                        <div className={`status-dot ${recipientRef.current.status === "ONLINE" ? "online" : "offline"}`}></div>
                                        <p>{recipientRef.current.status === "ONLINE" ? "Online" : "Offline"}</p>
                                    </div>
                                </div>
                            </Link>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="additional-icon"/>
                        </div>
                        <img src="../../../public/chat-icon/line.png" className="line"/>
                        <Link to="/detail" className="chat-post-container">
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                            <div className="post-title-price">
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                                <p>8 triệu/tháng</p>
                            </div>
                        </Link>
                        <img src="../../../public/chat-icon/line.png" className="line"/>
                        <div className="message-container">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={message.senderId === user.id ? "sender-message" : "recipient-message"}
                                >
                                    {message.content}
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>

                        <img src="../../../public/chat-icon/line.png" className="line"/>
                        <div className="send-message-bounding">
                            <FontAwesomeIcon icon={faCamera} className="camera-icon" onClick={handleCameraClick} />
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                            <input
                                type="text"
                                value={pendingMessage}
                                placeholder="Nhập tin nhắn"
                                onChange={(e) => setPendingMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendMessage();
                                }}
                            />
                            <img
                                src="../../../public/chat-icon/send.png"
                                className="send-icon"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyComponent;
