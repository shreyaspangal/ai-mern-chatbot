import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error('Unable to login');
    }

    const data = res.data;
    return data;
}

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error('Unable to logout');
    }

    const data = res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error('Unable to authenticate');
    }

    const data = res.data;
    return data;
}

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
        throw new Error('Unable to send Chat');
    }

    const data = res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.post("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error('Unable to get all Chats');
    }

    const data = res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.post("/chat/delete");
    if (res.status !== 200) {
        throw new Error('Unable to delete Chats');
    }

    const data = res.data;
    return data;
}