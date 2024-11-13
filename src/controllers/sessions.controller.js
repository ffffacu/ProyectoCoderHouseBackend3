import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { UserServices } from "../services/user.services.js";

const userServices = new UserServices();

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await userServices.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const user = {
            first_name,
            last_name,
            email,
            password: createHash(password),
        }
        let result = await userServices.create(user);
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await userServices.getUserByEmail(email);
    if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('coderCookie',token,{maxAge:3600000, httpOnly:true}).status(201).send({status:"success",message:"Logged in"})
}

const current = async(req,res) =>{
    try {
        const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');s
    if(user)
        return res.send({status:"success",payload:user})
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ status: "error", error: "Invalid sessions" });
        }
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const unprotectedLogin  = async(req,res) =>{
    try {
        const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await userServices.getUserByEmail(email);
    if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
    const userDto = UserDTO.getUserTokenFrom(user);
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
    const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000, httpOnly:true}).send({status:"success",message:"Unprotected Logged in"})
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}
const unprotectedCurrent = async(req,res)=>{
    try {
        const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ status: "error", error: "Invalid sessions" });
        }
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}