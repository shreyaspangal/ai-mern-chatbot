import {
    Request,
    Response, NextFunction
} from 'express';
import User from '../models/user.model.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Create token & set Cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });

        const token = createToken(newUser._id.toString(), newUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", user_id: newUser._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // Email checks...
        const user: any = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "ERROR", cause: "Email is not registered!" });
        }
        // Password checks...
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            return res.status(403).json({ message: "ERROR", cause: "Incorrect password!" });
        }

        // If Email & Password exists in DB...

        // Create token & set Cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        // Response
        return res.status(200).json({ message: "OK", user_id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};

export { getAllUsers, userSignup, userLogin };