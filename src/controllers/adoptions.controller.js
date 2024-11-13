import { PetsService } from "../services/pets.services.js";
import { UserServices } from "../services/user.services.js";
import {AdoptionServices} from "../services/adoptions.services.js";

const adoptionsService = new AdoptionServices()
const petsService = new PetsService()
const usersService = new UserServices()

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getById({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await petsService.getById(pid);
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    const newAdoption = await adoptionsService.create({owner:user._id,pet:pet._id})
    res.status(201).send({status:"success",payload:newAdoption,message:"Pet adopted"})
}
const deleteAdoption = async(req,res)=>{
    try {
        const adoptionId = req.params.aid;
        await adoptionsService.delete(adoptionId);
        res.status(200).send({status:"success",message:"Adoption deleted"})
    } catch (error) {
        res.status(500).send({status:"error",error:"Internal server error"})
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
    deleteAdoption
}