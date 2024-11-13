import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api");

describe("Test integration Adoptions", () => {
    let pets
    let user
    let adoptions
    it("[POST] /api/pets - New pets", async () => {
        const newPet ={
            name: "Jorgito",
            specie: "Perro2",
            birthDate: "1990-05-15T00:00:00.000Z"
        }
        const { body} = await request.post("/pets").send(newPet)
        pets = body.payload
    })
    it("[POST]  /api/sessions/register - New Users", async () => {
        const newUser ={
            first_name: "John",
            last_name: "Doe",
            email: "0qV9B2@example.com",
            password: "coder12345",
        }
        const {body} = await request.post("/sessions/register").send(newUser)
        user = body.payload
    })
    it("[POST] /api/adoptions - New adoptions", async () => {
        const {status, body} = await request.post(`/adoptions/${user._id}/${pets._id}`).send()
        adoptions = body.payload
        expect(status).to.be.equal(201)
    })
    it("[GET] /api/adoptions - Array of adoptions", async () => {
        const {status, body} = await request.get("/adoptions")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array")
    })
    it("[GET] /api/adoptions/aid - Adoptions for id", async () => {
        const {status, body} = await request.get(`/adoptions/${adoptions._id}`)
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("object")
        expect(body.payload.owner).to.be.equal(user._id)
        expect(body.payload.pet).to.be.equal(pets._id)
    })
    it("[DELETE] /api/adoptions/aid - Delete adoptions", async () => {
        const {status, body} = await request.delete(`/adoptions/${adoptions._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("Adoption deleted")
    })
    it("[DELETE] /api/pets/:id - Delete pets", async () => {
        const {status, body} = await request.delete(`/pets/${pets._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("Pet deleted")
    })
    it("[DELETE] /api/users/:id - Delete user", async () => {
        const {status, body} = await request.delete(`/users/${user._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("User deleted")
    })
})