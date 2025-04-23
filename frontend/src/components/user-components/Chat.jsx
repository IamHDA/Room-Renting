import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../../css/user-css/Chat.css';
import {faCamera, faEllipsisVertical, faMagnifyingGlass, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getImageMime} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import {getChatRooms, getMessages, getRecipient, updateChatRoomPost} from "../../apiServices/chat.js";
import SockJS from "sockjs-client";
import {Client} from '@stomp/stompjs';
import SockJSContext from "../../contexts/SockJSContext.jsx";

const MyComponent = () => {
    const { user } = useContext(AuthContext);
    const { setUpStompClient, disconnectStomp, stompClientRef } = useContext(SockJSContext);
    const {chatId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const postCreatorId = location.state?.userId;
    const [chatRoomPost, setChatRoomPost] = useState({});
    const fileInputRef = useRef(null);
    const messageEndRef = useRef(null);
    const chatRoomsRef = useRef(null);
    const recipientRef = useRef(null);
    const chatIdRef = useRef(chatId);
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
        chatRoomsRef.current = chatRooms;
    }, [chatRooms])

    useEffect(() => {
        fetchChatRoomMessage(chatId);
        if(location.pathname === "/chat") recipientRef.current = null;
    }, [location]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(user) await setUpStompClient(user.id, onMessageReceived, onPublicChannel);
                const chatRoomPostTmp = JSON.parse(localStorage.getItem("chatRoomPost"));
                if (chatRoomPostTmp) setChatRoomPost(chatRoomPostTmp);
                const tmpChatRooms = await fetchChatRooms();
                const savedRecipientId = localStorage.getItem("recipientId");
                setChatRooms(tmpChatRooms);
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

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const updateRecipientStatus = (announcedStatus, recipient) => {
        if(announcedStatus === "connect") recipient.status = "ONLINE";
        else if(announcedStatus === "disconnect") recipient.status = "OFFLINE";
    }

    const onPublicChannel = useCallback( (payload) => {
        const tmp = payload.body;
        const message = tmp.split(" ");
        const announcedUserId = Number(message[1]);
        const announcedStatus = message[0];
        let check = false;
        const updatedChatRooms = chatRoomsRef.current.map(chatRoom => {
            if (chatRoom.recipient.id === announcedUserId) {
                updateRecipientStatus(announcedStatus, chatRoom.recipient);
                check = true;
            }
            return chatRoom;
        });
        if(recipientRef.current && (recipientRef.current.id === announcedUserId)) updateRecipientStatus(announcedStatus, recipientRef.current);
        if(check) {
            setChatRooms(updatedChatRooms);
        }
    }, []);

    const onMessageReceived = useCallback(async (payload) => {
        setTimeout(() => {
            const message = JSON.parse(payload.body);
            if(message.chatId === chatIdRef.current) setMessages((prev) => [...prev, message]);
        }, 100);
        const tmpChatRooms = await fetchChatRooms();
        setChatRooms(tmpChatRooms);
    }, []);

    const sendMessage = async (e) => {
        if(pendingMessage.length === 0) e.preventDefault();
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
        let check = false;
        if(virtualChatRoom){
            await updateChatRoomPost(chatRoomPost, `${user.id}_${recipientRef.current.id}`);
            const tmpChatRooms = await fetchChatRooms();
            setChatRooms(tmpChatRooms);
            setVirtualChatRoom(false);
            navigate(`/chat/${chatIdRef.current}`);
            check = true;
        }
        const tmpChatRooms = await fetchChatRooms();
        setChatRooms(tmpChatRooms);
        setPendingMessage("");
        if(!check) setMessages((prevMessages) => [...prevMessages, payload]);
    }

    const checkExistChatRooms = (tmpChatRooms) => {
        const existChatRoom = tmpChatRooms.find(chatRoom => chatRoom.recipient.id === recipientRef.current.id);
        const newChatRoomPost = JSON.parse(localStorage.getItem("chatRoomPost"));
        if(existChatRoom){
            if(existChatRoom.chatRoomPost.id !== chatRoomPost.id) updateChatRoomPost(newChatRoomPost, chatId).then(() => {
                setChatRooms([...tmpChatRooms.map(chatRoom => chatRoom.chatId === existChatRoom.chatId
                    ? {...chatRoom, chatRoomPost: newChatRoomPost}
                    : chatRoom
                )])
                setVirtualChatRoom(false);
                navigate(`/chat/${existChatRoom.chatId}`);
            })
        }else{
            setVirtualChatRoom(true);
        }
    }

    const fetchChatRoomRecipient = async (recipientId) => {
        recipientRef.current = await getRecipient(recipientId);
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
                                <img src={`${chatRoomPost.thumbnailUrl}`} className="chat-post-img"/>
                            </div>
                        )}
                        {chatRooms.length > 0 && chatRooms.map((chatRoom, index) => (
                            <div className={`chat-room-bounding ${chatRoom.chatId === chatId ? "is-selected" : ""}`} key={index} onClick={() => {
                                localStorage.setItem("chatRoomPost", JSON.stringify(chatRoom.chatRoomPost));
                                setChatRoomPost(chatRoom.chatRoomPost);
                                recipientRef.current = chatRoom.recipient;
                                localStorage.setItem("recipientId", chatRoom.recipient.id);
                                navigate(`/chat/${chatRoom.chatId}`);
                            }}>
                                <div className="img-container">
                                    <img src={`data:${getImageMime(chatRoom.recipient.avatar)};base64,${chatRoom.recipient.avatar}`} className="opponent-img"/>
                                    <div className={`status-dot ${chatRoom.recipient.status === "ONLINE" ? "online" : "offline"}`}></div>
                                </div>
                                <div className="opponent-name-message">
                                    <h2>{chatRoom.recipient.fullName}</h2>
                                    <p>{chatRoom.lastMessage.senderId === user.id ? "Bạn: " : ""} {chatRoom.lastMessage.content}</p>
                                </div>
                                <img src={chatRoom.chatRoomPost.thumbnailUrl} className="chat-post-img"/>
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
                        <Link to={`/detail/${chatRoomPost.id}`} className="chat-post-container">
                            <img src={chatRoomPost.thumbnailUrl} className="chat-post-img"/>
                            <div className="post-title-price-area">
                                <h3 >{chatRoomPost.title}</h3>
                                <div className="post-price-area">
                                    <p>{chatRoomPost.price} triệu/tháng</p>
                                    <p>{chatRoomPost.area}m&sup2;</p>
                                </div>
                            </div>
                        </Link>
                        <img src="../../../public/chat-icon/line.png" className="line"/>
                        <div className="message-container">
                            {messages.map((message, index) => {
                                if (message.senderId === user.id) {
                                    return (
                                        <div key={index} className="sender-message-div">
                                            <p className="sender-message">{message.content}</p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="recipient-message-div" key={index}>
                                            <img
                                                src={`data:${getImageMime(recipientRef.current.avatar)};base64,${recipientRef.current.avatar}`}
                                                style={{ height: "45px", width: "45px", borderRadius: "50%" }}
                                            />
                                            <p className="recipient-message">{message.content}</p>
                                        </div>
                                    );
                                }
                            })}
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
