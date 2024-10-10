import Users from "../dao/Users.dao.js";
import {generateUsersMock} from "../mocks/user.mock.js";


export class UserServices {
    constructor(){
        this.userDao = new Users();
    }
    async getAll(){
        const users = await this.userDao.get();
        return users;
    }
    async getUserById(id){
        const user = await this.userDao.getBy({_id:id});
        return user;
    }
    async getUserByEmail(email){
        const user = await this.userDao.getByEmail(email);
        return user;
    }
    async create(doc){
        console.log(doc)
        const user = await this.userDao.save(doc);
        return user;
    }
    async update(id,doc){
        const user = await this.userDao.update(id,doc);
        return user;
    }
    async delete(id){
        const user = await this.userDao.delete(id);
        return user;
    }
    async generateMockUser (cu){
        const users = generateUsersMock(cu);
        const userDb = await this.userDao.saveMany(users);  
        return userDb
    }
}