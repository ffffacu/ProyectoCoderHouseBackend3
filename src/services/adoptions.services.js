import Adoption from "../dao/Adoption.js";

export class AdoptionServices{
    constructor(){
        this.adoptionsDao = new Adoption();
    }
    async getAll(){
        const adoptions = await this.adoptionsDao.get();
        return adoptions;
    }
    async getById(id){
        const adoptionsId = await this.adoptionsDao.getBy(id)
        return adoptionsId;
    }
    async create(data){
        const newAdoptions = await this.adoptionsDao.save(data);
        return newAdoptions;
    }
    async update(id,data){
        const updateAdoptions = await this.adoptionsDao.update(id,data);
        return updateAdoptions;
    }
    async delete(id){
        const deleteAdoptions = await this.adoptionsDao.delete(id);
        return deleteAdoptions
    }
}