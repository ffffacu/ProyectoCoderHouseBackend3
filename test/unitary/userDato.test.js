import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import {expect} from "chai"

mongoose.connect('mongodb+srv://admin:156006@backendfacu.okcuevo.mongodb.net/backendTest')

describe("Test UserDao",()=>{
    const userDao = new Users()
    let userTest;
    before(()=>{
        console.log("Test initialize")
    })
    beforeEach(()=>{
        console.log("Is executed for each test")
    })


    // Test unitary
    it("Return all users", async()=>{
        const users = await userDao.get()
        expect(users).to.be.an('array');
        expect(users).to.be.not.an("object")
    })
    it("Save and return user", async()=>{
        const newUser = {
            first_name: "John",
            last_name: "Doe",
            email: "dasd121@example.com",
            password: "1234",
            role: "user",
            pets: [],
            age:30
        }
        const user = await userDao.save(newUser)
        userTest = user
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id")
        expect(user.first_name).to.be.equal(newUser.first_name)
        expect(user.last_name).to.be.equal(newUser.last_name)
        expect(user.email).to.be.equal(newUser.email)
        expect(user.password).to.be.equal(newUser.password)
        expect(user.role).to.be.equal("user")
        expect(user.pets).to.be.an("array")
        expect(user).to.not.have.property("age")
        expect(user).to.not.be.null
        expect(user).to.not.be.an("array")
    })
    it("Return user for id", async()=>{
        const user = await userDao.getBy(userTest._id)
        expect(user).to.be.an("object");
        expect(user.first_name).to.be.equal(userTest.first_name)
        expect(user.last_name).to.be.equal(userTest.last_name)
        expect(user.email).to.be.equal(userTest.email)
        expect(user.password).to.be.equal(userTest.password)
        expect(user).to.have.property("_id")
    })

    it("Update user", async()=>{
        const updatedUser = {
            first_name: "Pepe",
            last_name: "Perez2",
            password: "12345",
        }
        const user = await userDao.update(userTest._id,updatedUser)
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id")
        expect(user.first_name).to.be.equal("Pepe")
        expect(user.last_name).to.be.equal("Perez2")
        expect(user.password).to.be.equal("12345")
    })
    it("Delete user", async()=>{
        await userDao.delete(userTest._id)
        const user = await userDao.delete(userTest._id)
        expect(user).to.be.null
    })
    
    after(()=>{
        console.log("Test finished")
        mongoose.disconnect()
    })
    afterEach(()=>{
        console.log("Individual test completed")
    })
})