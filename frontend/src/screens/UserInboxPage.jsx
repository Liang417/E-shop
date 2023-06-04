import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { format } from 'timeago.js';
import { AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import socketIO from 'socket.io-client';
import { apiURL, backendURL } from '../apiConfig';
import styles from '../styles/styles';
const socket = socketIO('http://ec2-18-141-164-122.ap-southeast-1.compute.amazonaws.com:1688', { transports: ['websocket'] });

const UserInboxPage = () => {
  const { user } = useSelector((state) => state.user);
  const [allConversations, setAllConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState();
  const [seller, setSeller] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState('');
  const scrollRef = useRef(null);

  // get all conversations of user
  useEffect(() => {
    const getAllConversationOfUser = async () => {
      await axios
        .get(`${apiURL}/conversation/user/${user._id}`, { withCredentials: true })
        .then((res) => {
          setAllConversations(res.data.conversations);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    getAllConversationOfUser();
  }, [user, arrivalMessage, allConversations]);

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
    if (user) {
      socket.emit('addUser', user._id);
      socket.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  // listener for emitted 'getMessage' events from the socketIO server
  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        createdAt: Date.now(),
        images: data.images,
      });
    });
  }, []);

  // when get the arrivalMessage from the socketIO server, push this new message to the the messages
  useEffect(() => {
    const group = [currentConversation?.user._id, currentConversation?.seller._id];
    if (arrivalMessage && group.includes(arrivalMessage.senderId)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, user]);

  // scroll view to bottom
  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView({ behavior: 'instant' });
  }, [messages, open]);

  // handle sending message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      senderId: user._id,
      content: newMessage,
      conversationId: currentConversation._id,
    };

    // emit 'sendMessage' event with provided object to socketIO server
    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId: currentConversation.seller._id,
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
    formData.append('senderId', user._id);
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
            senderId: user._id,
            receiverId: currentConversation.seller._id,
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
      lastMessage: isPhoto ? 'Photo' : newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${apiURL}/conversation/${currentConversation._id}`, {
        lastMessage: isPhoto ? 'Photo' : newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">All Messages</h1>
          {/* All messages list */}
          <div className="px-5 max-h-[60vh] overflow-y-scroll">
            {allConversations &&
              allConversations.map((conversation, index) => (
                <MessageList
                  conversation={conversation}
                  key={index}
                  setCurrentConversation={setCurrentConversation}
                  setOpen={setOpen}
                  onlineUsers={onlineUsers}
                  setSeller={setSeller}
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
        <>
          <div className="px-5">
            <SellerInbox
              seller={seller}
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              scrollRef={scrollRef}
              setMessages={setMessages}
              handleImageUpload={handleImageUpload}
              onlineUsers={onlineUsers}
              userId={user._id}
              images={images}
            />
          </div>
        </>
      )}
    </div>
  );
};

const MessageList = ({ conversation, setOpen, setCurrentConversation, onlineUsers, setSeller }) => {
  // online seller
  const online = onlineUsers.some((onlineUser) => onlineUser.userId === conversation.seller._id);

  return (
    <div
      className="w-full flex p-3 cursor-pointer border border-t-0 hover:bg-[#00000010]"
      onClick={(e) => {
        setOpen(true) || setCurrentConversation(conversation) || setSeller(conversation.seller);
      }}
    >
      <div className="relative">
        <img
          src={`${backendURL}/${conversation.seller.avatar}`}
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
        <h1 className="text-[18px]">{conversation.seller.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {conversation?.lastMessageId !== conversation?.seller._id
            ? 'You:'
            : conversation?.seller.name.split(' ')[0] + ': '}{' '}
          {conversation?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  seller,
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  handleImageUpload,
  onlineUsers,
  images,
}) => {
  // online seller
  const online = onlineUsers.some((onlineUser) => onlineUser.userId === seller._id);

  return (
    <div className="w-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-2 items-center justify-between bg-slate-200 border-b border-gray-400">
        <div className="flex">
          <div className="relative">
            <img
              src={`${backendURL}/${seller.avatar}`}
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
            <h1 className="text-[18px] font-[600]">{seller.name}</h1>
          </div>
        </div>
        <RxCross1 size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      {/* messages */}
      <div className="h-[55vh] p-2 overflow-y-scroll bg-stone-200" ref={scrollRef}>
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  message.senderId === userId ? 'justify-end' : 'justify-start'
                }`}
                key={index}
              >
                {message.senderId !== userId && (
                  <img
                    src={`${backendURL}/${seller?.avatar}`}
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
                      message.senderId === userId ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`w-fit max-w-[18rem] md:max-w-lg h-min rounded-r-2xl rounded-l-2xl p-2 my-1.5 ${
                        message.senderId === userId
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
            value={images}
            id="image"
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

export default UserInboxPage;
