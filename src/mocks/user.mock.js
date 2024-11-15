import {fakerES_MX as faker} from '@faker-js/faker';
import { createHash} from "../utils/index.js";

export const generateUsersMock = (amount) =>{
    const users = [];
    for(let i = 0; i < amount; i++){
        const user ={
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: createHash("coder123"),
            role: faker.datatype.boolean() ? "admin" : "user",
            pets:[]
        }
        users.push(user);
    }
    return users
}