import { UserServices } from "../services/user.services.js";

const userService = new UserServices();

const getAllUsers = async(req,res)=>{
    const users = await userService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await userService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await userService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await userService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await userService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

const createUserMock = async (req,res) =>{
    const {cu} = req.params
    const users = await userService.generateMockUser(cu);
    res.send({status:"success",payload:users})
}


export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUserMock
}