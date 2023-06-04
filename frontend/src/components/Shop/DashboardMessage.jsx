import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURL, backendURL } from '../../apiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { format } from 'timeago.js';
import { AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import styles from '../../styles/styles';
import socketIO from 'socket.io-client';
const socket = socketIO('http://ec2-18-141-164-122.ap-southeast-1.compute.amazonaws.com:1688', { transports: ['websocket'] });

const DashboardMessage = () => {
  const { seller } = useSelector((state) => state.seller);
  const [allConversations, setAllConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState();
  const [user, setUser] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  // get all conversations of seller
  useEffect(() => {
    const getAllConversationOfSeller = async () => {
      await axios
        .get(`${apiURL}/conversation/seller/${seller._id}`, { withCredentials: true })
        .then((res) => {
          setAllConversations(res.data.conversations);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    getAllConversationOfSeller();
  }, [seller, arrivalMessage, allConversations]);

  // get all messages
  useEffect(() => {
    const getAllMessage = async () => {
      try {
        const response = await axios.get(`${apiURL}/message/${currentConversation?._id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getAllMessage();
  }, [currentConversation]);

  // get all online users
  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socket.emit('addUser', sellerId);
      socket.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  // listener for emitted 'getMessage' events from the socketIO server
  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        images: data.images,
        createdAt: Date.now(),
      });
    });
  }, []);

  // when get the arrivalMessage from the socketIO server, push this new message to the the messages
  useEffect(() => {
    const group = [currentConversation?.user._id, currentConversation?.seller._id];
    if (arrivalMessage && group.includes(arrivalMessage.senderId)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, seller]);

  // scroll view to bottom
  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView({ behavior: 'instant' });
  }, [messages, open]);

  // handle sending message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      senderId: seller._id,
      content: newMessage,
      conversationId: currentConversation._id,
    };

    // emit 'sendMessage' event with provided object to socketIO server
    socket.emit('sendMessage', {
      senderId: seller._id,
      receiverId: currentConversation.user._id,
      content: newMessage,
    });

    if (newMessage !== '') {
      await axios
        .post(`${apiURL}/message`, message)
        .then((res) => {
          setNewMessage('');
          updateLastMessage();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('images', file);
    formData.append('senderId', seller._id);
    formData.append('content', newMessage);
    formData.append('conversationId', currentConversation._id);

    try {
      await axios
        .post(`${apiURL}/message`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setImages('');
          updateLastMessage('Photo');
          socket.emit('sendMessage', {
            senderId: seller._id,
            receiverId: currentConversation.user._id,
            images: res.data.message.images,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  // update the last message
  const updateLastMessage = async (isPhoto) => {
    // emit 'updateLastMessage' event with provided object to socketIO server
    socket.emit('updateLastMessage', {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${apiURL}/conversation/${currentConversation._id}`, {
        lastMessage: isPhoto ? 'Photo' : newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-[90%] bg-white m-3 h-[80vh]">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">All Messages</h1>
          {/* All messages list */}
          <div className="max-h-[75vh] overflow-y-scroll">
            {allConversations &&
              allConversations.map((conversation, index) => (
                <MessageList
                  conversation={conversation}
                  key={index}
                  setUser={setUser}
                  setOpen={setOpen}
                  setCurrentConversation={setCurrentConversation}
                  onlineUsers={onlineUsers}
                />
              ))}
          </div>
          {allConversations && allConversations.length === 0 && (
            <div className="h-[50vh] flex items-center justify-center">
              <h1 className="text-xl">No messages yet😮</h1>
            </div>
          )}
        </>
      )}

      {open && (
        <SellerInbox
          user={user}
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
          onlineUsers={onlineUsers}
          images={images}
        />
      )}
    </div>
  );
};

const MessageList = ({ conversation, setOpen, setCurrentConversation, onlineUsers, setUser }) => {
  const navigate = useNavigate();
  // online user
  const online = onlineUsers.some((onlineUser) => onlineUser.userId === conversation.user._id);

  const handleClick = (id) => {
    navigate(`/shop/dashboard-inbox?${id}`);
    setOpen(true);
  };

  return (
    <div
      className="w-full flex p-3 cursor-pointer border border-t-0 hover:bg-[#00000010]"
      onClick={(e) =>
        handleClick(conversation._id) ||
        setCurrentConversation(conversation) ||
        setUser(conversation.user)
      }
    >
      <div className="relative">
        <img
          src={`${backendURL}/${conversation.user.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full border border-blue-300"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{conversation.user.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {conversation?.lastMessageId !== conversation?.user._id
            ? 'You:'
            : conversation?.user.name.split(' ')[0] + ': '}{' '}
          {conversation?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  user,
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  handleImageUpload,
  onlineUsers,
  images,
}) => {
  // online user
  const online = onlineUsers.some((onlineUser) => onlineUser.userId === user._id);

  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-2 items-center justify-between bg-slate-200">
        <div className="flex">
          <div className="relative">
            <img
              src={`${backendURL}/${user.avatar}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full border border-blue-300"
            />
            {online ? (
              <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
            ) : (
              <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
            )}
          </div>
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{user.name}</h1>
          </div>
        </div>
        <RxCross1 size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      {/* messages */}
      <div className="h-[60vh] p-2 overflow-y-scroll" ref={scrollRef}>
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  message.senderId === sellerId ? 'justify-end' : 'justify-start'
                }`}
                key={index}
              >
                {message.senderId !== sellerId && (
                  <img
                    src={`${backendURL}/${user?.avatar}`}
                    alt="User avatar"
                    className="w-[40px] h-[40px] rounded-full mr-3 border border-blue-300"
                  />
                )}
                {message.images && (
                  <div>
                    <img
                      src={`${backendURL}/${message.images}`}
                      alt=""
                      className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                    />
                    <p className="text-[12px] text-[#00000050] text-start my-1.5">
                      {format(message.createdAt)}
                    </p>
                  </div>
                )}
                {message.content && (
                  <div
                    className={`flex flex-col ${
                      message.senderId === sellerId ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`w-fit max-w-[18rem] md:max-w-lg h-min rounded-r-2xl rounded-l-2xl p-2 my-1.5 ${
                        message.senderId === sellerId
                          ? 'bg-[#86d97b] text-[#373737]'
                          : 'bg-[#555555] text-[#dfdfdf]'
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                    </div>

                    <p className="text-[12px] text-[#00000050] text-end">
                      {format(message.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form
        className="p-3 relative w-full flex justify-between items-center border"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            value={images}
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend size={20} className="absolute right-4 top-5 cursor-pointer" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessage;
