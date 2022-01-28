// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel')
// const { generateToken } = require('../useful/generateToken.js');
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../useful/generateToken.js";
import { validateName, validateEmail, checkPasswordStrength } from "../useful/functionsRegex.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, passwordConfirmation, acceptsTerms } = req.body;

    const nameExists = await User.findOne({ name });
    const emailExists = await User.findOne({ email });
    const passwordsMatch = password === passwordConfirmation && checkPasswordStrength(password) === 4;
    const termsAccepted = acceptsTerms === true;

    if(!nameExists && validateName(name) && validateEmail(email) && !emailExists && passwordsMatch && termsAccepted){
        const user = await User.create({
            name,
            email,
            password,
            acceptsTerms,
        });
        res.status(201)
            .json({
                message: "Congratulations! Your account has been created successfully!",
                _id: user._id,
                name: user.name,
                email: user.email,
                acceptsTerms: user.acceptsTerms,
            })
    } else {
        if(name.length == 0){
            res.status(400);
            throw new Error ("Name not found. Please enter your name!")
        } else if(nameExists) {
            res.status(400);
            throw new Error ("The name you entered already exists!")
        } else if(!validateName(name)) {
            res.status(400);
            throw new Error ("The name you entered is not valid! Please try again.")
        }
        if(email.length === 0){
            res.status(400);
            throw new Error("Email not found. Please enter your Email address!")
        } 
        if(emailExists){
            res.status(400);
            throw new Error ("The Email address you entered already exists!")
        }
        if(!validateEmail(email) && email.length !== 0){
            res.status(400);
            throw new Error ("Please enter a valid Email address!")
        }
        if(checkPasswordStrength(password) < 4){
            if(password.length === 0){
                res.status(400);
                throw new Error ("Please enter your password!")
            } else if(password.length < 8){
                res.status(400);
                throw new Error ("Your password must contain at least 8 characters!")
            } else {
                res.status(400);
                throw new Error("Your password must contain at least one Uppercase character, one lowercase character, one number and one special character!")
            }
        } 
        if(passwordConfirmation.length === 0){
            res.status(400);
            throw new Error ("Please enter your password again!")
        }
        if(password !== passwordConfirmation && passwordConfirmation.length !== 0){
            res.status(400);
            throw new Error ("Passwords do not match!")
        }
        if(!termsAccepted){
            res.status(400);
            throw new Error ("Please indicate that you have read and agreed to the Terms and Conditions!")
        }
    }  
    });

    const authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body

        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error ("Invalid Email or Password!")
        }
    });

    
// module.exports = { registerUser, authUser };
export { authUser, registerUser };