import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const error = await validation.run(req);
            if (!error.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    }
};

const loginValidator = [
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters."),
]

const signupValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

const chatCompletionValidator = [
    body("message").trim().notEmpty().withMessage("Message is required"),
];

export { validate, signupValidator, loginValidator, chatCompletionValidator };