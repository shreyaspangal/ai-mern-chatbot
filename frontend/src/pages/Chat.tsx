import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChatItem from '../components/chat/ChatItem';
import { useAuth } from '../context/AuthContext';
import { IoSend } from "react-icons/io5";
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicators';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
    role: "user" | "assistant";
    content: string;
}

const Chat = () => {
    const auth = useAuth();
    const inputRef = useRef<any>();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth?.user) {
            toast.loading("Loading chats...", { id: 'loadchats' });
            getUserChats()
                .then(data => {
                    setChatMessages([...data.chats]);
                    toast.success("Successfully loaded chats", { id: 'loadchats' })
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to load chats", { id: 'loadchats' })
                })
        }
    }, [auth])

    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login");
        }
    }, []);

    const handleSubmit = async () => {
        const content = inputRef?.current?.value as string;
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage: Message = { role: "user", content };
        setChatMessages((prev) => [...prev, newMessage]);

        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    };

    const enterKeyPress = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit();
        }
    }

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting chats...", { id: 'deletechats' });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted chats successfully", { id: 'deletechats' });
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete chats", { id: 'deletechats' });
        }
    }

    return (
        <div className="lg:flex w-full h-full mt-3 gap-3">
            <div className="hidden lg:flex flex-[0.2] flex-col">
                <div className="flex p-5 gap-3 flex-col items-center w-full bg-slate-500 rounded-xl mx-3">
                    <div className="inline-flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-[rgb(17,29,39)]">
                        <div className="text-lg font-medium leading-none text-white fw-700">
                            {auth?.user?.name[0]}
                        </div>
                    </div>
                    <p className="mb-0 mx-auto">
                        You are talking to a Chat bot
                    </p>
                    <p className="mx-auto my-8">
                        You can ask some questions related to Business, Education, etc.
                        But avoid sharing any personal information.
                    </p>
                    <button
                        onClick={handleDeleteChats}
                        type="button"
                        className="rounded bg-red-600 px-2 py-1 text-lg font-semibold 
                        text-white shadow-sm hover:bg-red-500 transition ease-in-out duration-300 active:bg-red-700 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-red-600 w-[200px]"
                    >
                        Clear conversation
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-[0.8] p-3">
                <h4 className="text-center text-3xl text-white mb-2 mx-auto">
                    Model - GPT 3.5 Turbo
                </h4>
                <div className="flex flex-col overflow-x-hidden overflow-y-auto scroll-smooth w-full h-[60vh] rounded-sm mx-auto">
                    {
                        chatMessages?.map((chat, idx) => (
                            //@ts-ignore
                            <ChatItem key={idx} content={chat?.content} role={chat?.role} />
                        ))
                    }
                </div>
                <div className="relative mt-2">
                    <input
                        ref={inputRef}
                        type="text"
                        name="text"
                        id="text"
                        className="block w-full rounded-md border-0 h-16 pl-4 pr-14 py-3 text-gray-100 shadow-sm outline-0  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 text-sm md:text-[18px] sm:leading-6 bg-[rgb(17,27,39)]"
                        placeholder="Type in here..."
                        onKeyDown={enterKeyPress}
                    />
                    <div className="absolute inset-y-0 right-5 flex items-center z-2">
                        <IoSend className="h-5 w-5 text-gray-400 hover:text-gray-200 hover:cursor-pointer active:text-gray-100" aria-hidden="true" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat