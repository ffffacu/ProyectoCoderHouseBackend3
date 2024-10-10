import { Router } from "express";
import userController from "../controllers/users.controller.js";
import petsController from "../controllers/pets.controller.js";
import { PetsService } from "../services/pets.services.js"
import { UserServices } from "../services/user.services.js"



const router = Router();

router.get("/mockingpets/:cp", petsController.createMocksPets )
router.get("/mockingusers/:cu", userController.createUserMock)
router.get("/generateData/:cu/:cp",async(req,res)=>{
    const {cu, cp} = req.params

    const petsService = new PetsService();
    const usersService = new UserServices();
    const petsGenerated = await petsService.generateMockpets(cp);
    const userGenerated = await usersService.generateMockUser(cu)
    res.status(200).json({status:"success",message:"Data generated", payload:{petsGenerated, userGenerated}})
})



export default router;