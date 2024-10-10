import Pets from "../dao/Pets.dao.js";
import {generatePetsMock} from "../mocks/pets.mock.js";

export class PetsService{
    constructor(){
        this.petsDao = new Pets();
    }
    async getAll(){
        const pets = await this.petsDao.get();
        return pets;
    }
    async getById(id){
        const pet = await this.petsDao.getBy(id);
        return pet
    }
    async create(data){
        const pet = await this.petsDao.save(data);
        return pet;
    }
    async update(id,data){
        const pet = await this.petsDao.update(id,data);
        return pet;
    }
    async delete(id){
        const pet = await this.petsDao.delete(id);
        return pet;
    }
    async generateMockpets (cp){
        const pets = generatePetsMock(cp);
        const petDb = await this.petsDao.saveMany(pets);  
        return petDb
    }
}