import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
import { configureOpenAi } from "../config/openai.config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { message } = req.body;
    try {
        // Get user details
        const { id: jwtUserId } = res.locals.jwtData;
        const user = await User.findById(jwtUserId);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" })
        }
        // Get chats of users
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        // send all chats to OpenAi with this new one
        const config = configureOpenAi();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong with Chats", cause: error.message });
    }
}

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: jwtUserId } = res.locals.jwtData;
        const user = await User.findById(jwtUserId);

        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        if (user._id.toString() !== jwtUserId) {
            return res.status(401).json({ message: "Permissions dont match" });
        }

        // Response
        return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {

    }
}

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: jwtUserId } = res.locals.jwtData;
        const user = await User.findById(jwtUserId);

        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        if (user._id.toString() !== jwtUserId) {
            return res.status(401).json({ message: "Permissions dont match" });
        }

        //@ts-ignore
        user.chats = [];
        await user.save();

        // Response
        return res.status(200).json({ message: "OK" });
    } catch (error) {

    }
}