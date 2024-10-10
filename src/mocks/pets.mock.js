import {fakerES_MX as faker} from '@faker-js/faker';

export const generatePetsMock = (amount) =>{
    const pets = [];
    for(let i = 0; i < amount; i++){
        const pet ={
            name:faker.animal.dog(),
            specie:faker.animal.type(),
            birthDate:faker.date.birthdate(),
            adopted:false,
            owner:null,
            image:faker.image.avatar()
        }
        pets.push(pet);        
    }
        return pets
    }
