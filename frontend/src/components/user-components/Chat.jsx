import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../../css/user-css/Chat.css';
import {
    faCamera,
    faEllipsisVertical,
    faMagnifyingGlass,
    faPlus,
    faTrash,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getImageMime} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import { getRecipient } from "../../apiServices/chat.js";
import { updateChatRoomPost, updateLastMessageStatus, getChatRooms, searchChatRooms} from "../../apiServices/chatRoom.js";
import { getMessages, uploadMessageMedia } from "../../apiServices/message.js";
import SockJSContext from "../../contexts/SockJSContext.jsx";
import {useDebounce} from "../../hooks/useDebounce.js";

const MyComponent = () => {
    const { user } = useContext(AuthContext);
    const { setUpStompClient, disconnectStomp, stompClientRef } = useContext(SockJSContext);
    const {chatId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const postCreatorId = location.state?.userId;
    const [chatRoomPost, setChatRoomPost] = useState({});
    const messageEndRef = useRef(null);
    const chatRoomsRef = useRef(null);
    const recipientRef = useRef(null);
    const chatIdRef = useRef(chatId);
    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [pendingMessage, setPendingMessage] = useState("");
    const [virtualChatRoom, setVirtualChatRoom] = useState(false);
    const [mediaListState, setMediaListState] = useState([]);
    const [searchText, setSearchText] = useState("");
    const debounceSearch = useDebounce(searchText, 500);
    const [chatRoomsFromSearch, setChatRoomsFromSearch] = useState([]);
    const [currentChatMediaList, setCurrentChatMediaList] = useState([]);
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
        if(debounceSearch === "") setChatRoomsFromSearch([]);
        else{
            const searchChatRoom = async () => {
                const response = await searchChatRooms(debounceSearch);
                setChatRoomsFromSearch(response);
                console.log(response);
            }
            searchChatRoom();
        }
    }, [debounceSearch]);

    useEffect(() => {
        chatRoomsRef.current = chatRooms;
        const chatRoomId = localStorage.getItem("chatRoomId");
        if(!chatRoomId) {
            chatRooms.map(chatRoom => {
                if(chatRoom.chatId === chatId) localStorage.setItem("chatRoomId", chatRoom.id);
            });
        }
    }, [chatRooms])

    useEffect(() => {
        fetchChatRoomMessage(chatId);
        if(location.pathname === "/chat") recipientRef.current = null;
    }, [location]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if(messages.mediaList) setCurrentChatMediaList([...messages.mediaList]);
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

    const handleClickChatRoom = (chatRoom) => {
        localStorage.setItem("chatRoomPost", JSON.stringify(chatRoom.chatRoomPost));
        localStorage.setItem("recipientId", chatRoom.recipient.id);
        localStorage.setItem("chatRoomId", chatRoom.id);
        if(chatId === chatRoom.chatId) localStorage.setItem("chatRoomId", chatRoom.id);
        setChatRoomPost(chatRoom.chatRoomPost);
        if(chatRoom.lastMessage.status === "UNSEEN") updateLastMessageStatus(chatRoom.id);
        setChatRooms(prevRooms =>
            prevRooms.map(room =>
                room.chatId === chatRoom.chatId ?
                    {
                        ...room,
                        lastMessage: {
                            ...room.lastMessage,
                            status: "SEEN"
                        }
                    } : room
            )
        );
        recipientRef.current = chatRoom.recipient;
        navigate(`/chat/${chatRoom.chatId}`);
    }

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
        if(check) setChatRooms(updatedChatRooms);
    }, []);

    const onMessageReceived = useCallback(async (payload) => {
        setTimeout(async () => {
            const message = JSON.parse(payload.body);
            if(message.chatId === chatId) await updateLastMessageStatus(localStorage.getItem("chatRoomId"));
            if(message.chatId === chatIdRef.current) setMessages((prev) => [...prev, message]);
            const tmpChatRooms = await fetchChatRooms();
            setChatRooms(tmpChatRooms);
        }, 150);
    }, []);

    const extractMediaType = (mediaType) => {
        return mediaType.split("/")[0].toUpperCase();
    }

    const sendMessage = async (e) => {
        if(pendingMessage.length === 0 && mediaListState.length === 0){
            e.preventDefault();
            return;
        }
        let response = [];
        if(mediaListState.length > 0){
            const formData = new FormData();
            for(const file of mediaListState) {
                formData.append("file", file);
            }
            response = await uploadMessageMedia(chatId, formData);
        }
        const payload = {
            content: pendingMessage.trim(),
            recipientId: recipientRef.current.id,
            senderId: user.id,
            chatId: chatId,
            mediaList: response
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
        setMediaListState([]);
        let mediaList = mediaListState.map(media => ({
            url: URL.createObjectURL(media),
            type: extractMediaType(media.type)
        }));
        payload.mediaList = mediaList;
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

    const displayMessageMedia = (messageMediaList) => {
        return(
            <div className={`media-grid media-count-${messageMediaList.length}`}>
                {messageMediaList.map((media, index) => {
                    if(media.type === "IMAGE") return <img src={media.url} key={index}></img>
                    else return <img src="/chat-icon/play-video.png" alt="" style={{backgroundColor: "lightgray"}}/>
                })}
            </div>
        )
    }

    return (
        <div className="chat-body">
            <div className="chat-container">
                <div className="left">
                    <div className="search-chat-room">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            type="text"
                            value={searchText}
                            placeholder="Tìm kiếm người dùng"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <img src="/chat-icon/line.png" className="line" style={{width: "110%"}}/>
                    {!searchText ? (
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
                                <div className={`chat-room-bounding ${chatRoom.lastMessage.status === "UNSEEN" ? "unSeen" : ""} ${chatRoom.chatId === chatId ? "is-selected" : ""}`} key={index} onClick={() => handleClickChatRoom(chatRoom)}>
                                    <div className="img-container">
                                        <img src={`data:${getImageMime(chatRoom.recipient.avatar)};base64,${chatRoom.recipient.avatar}`} className="opponent-img"/>
                                        <div className={`status-dot ${chatRoom.recipient.status === "ONLINE" ? "online" : "offline"}`}></div>
                                    </div>
                                    <div className="opponent-name-message">
                                        <p className="opponent-name">{chatRoom.recipient.fullName}</p>
                                        <p className="opponent-last-message">{chatRoom.lastMessage.senderId === user.id ? "Bạn: " : ""} {chatRoom.lastMessage.content}</p>
                                    </div>
                                    <img src={chatRoom.chatRoomPost.thumbnailUrl} className="chat-post-img"/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="chat-room-container"
                            style={{
                                alignItems: "flex-start",
                                gap: "10px",
                                overflowY: "auto"
                            }}
                        >
                            {chatRoomsFromSearch.map((chatRoom, index) => (
                                <div className="chat-room-bounding"
                                     key={index}
                                     style={{
                                         gap: "10px",
                                     }}
                                     onClick={() => {
                                        setChatRoomsFromSearch([]);
                                        handleClickChatRoom(chatRoom);
                                }}>
                                    <img src={`data:${getImageMime(chatRoom.recipient.avatar)};base64,${chatRoom.recipient.avatar}`} className="opponent-img"/>
                                    <p className="opponent-name">{chatRoom.recipient.fullName}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <img src="/chat-icon/line.png" className="line"/>
                    <div className="delete-conversation">
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Xóa hội thoại</p>
                    </div>
                </div>
                <img src="/chat-icon/stand-line.png"/>
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
                        <img src="/chat-icon/line.png" className="line"/>
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
                        <img src="/chat-icon/line.png" className="line"/>
                        <div className="message-container">
                            {messages.map((message, index) => {
                                if (message.senderId === user.id) {
                                    return (
                                        <div key={index} className="sender-message-div">
                                            {message.content !== "" && <p className="sender-message">{message.content}</p>}
                                            {message.mediaList && displayMessageMedia(message.mediaList)}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="recipient-message-div" key={index}>
                                            <img
                                                src={`data:${getImageMime(recipientRef.current.avatar)};base64,${recipientRef.current.avatar}`}
                                                style={{ height: "45px", width: "45px", borderRadius: "50%", alignSelf: "flex-end" }}
                                            />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "5px"
                                            }}>
                                                {message.content !== "" && <p className="recipient-message">{message.content}</p>}
                                                {message.mediaList && displayMessageMedia(message.mediaList)}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                            <div ref={messageEndRef} />
                        </div>
                        <div className="send-message-bounding">
                            <label htmlFor="mediaUpload" style={{ alignSelf: "flex-end" }}>
                                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
                                <input
                                    type="file"
                                    id="mediaUpload"
                                    name="media"
                                    multiple
                                    accept="image/*, video/*"
                                    hidden
                                    onChange={(e) => setMediaListState([...e.target.files])}
                                />
                            </label>
                            <div className="message-input-bounding">
                                {mediaListState.length > 0 && (
                                    <div
                                        style={{
                                            backgroundColor: "inherit",
                                            display: "flex",
                                            gap: "10px",
                                            overflowX: "auto",
                                            width: "800px",
                                        }}
                                    >
                                        <label htmlFor="addMedia" className="chat-small-upload-box">
                                            <FontAwesomeIcon icon={faPlus} />
                                            <input
                                                type="file"
                                                id="addMedia"
                                                name="media"
                                                accept="image/*, video/*"
                                                multiple
                                                hidden
                                                onChange={(e) => {setMediaListState(prev => [...prev, ...e.target.files])}}
                                            />
                                        </label>
                                        {mediaListState.map((file, index) => (
                                            <div key={index} style={{position: "relative"}}>
                                                <img src={URL.createObjectURL(file)}
                                                     style={{width: "92px", height: "92px", borderRadius: "10px", objectFit:"cover"}} alt=""
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "0",
                                                        right: "0",
                                                        borderRadius: "50%",
                                                        backgroundColor: "lightgray",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {setMediaListState(prev => prev.filter((_, i) => i !== index))}}>
                                                    <FontAwesomeIcon icon={faXmark} style={{fontSize: "15px", color: "black"}}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <input
                                    type="text"
                                    value={pendingMessage}
                                    placeholder="Nhập tin nhắn"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "inherit",
                                        fontSize: "20px",
                                        outline: "none",
                                        border: "none"
                                    }}
                                    onChange={(e) => setPendingMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") sendMessage();
                                    }}
                                />
                            </div>
                            <img
                                src="../../../public/chat-icon/send.png"
                                className="send-icon"
                                onClick={sendMessage}
                                style={{ alignSelf: "flex-end" }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyComponent;