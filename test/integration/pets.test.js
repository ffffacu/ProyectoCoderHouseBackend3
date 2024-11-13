import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/pets");

describe("Test integration Pets", () => {
    let pets;
    it("[GET] /api/pets - Array of pets", async () => {
        const {status, body} = await request.get("/")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array")
    })
    it("[POST] /api/pets - New pets", async () => {
        const newPet ={
            name: "Pepito",
            specie: "Perro",
            birthDate: "1990-05-15T00:00:00.000Z"
        }
        const {status, body} = await request.post("/").send(newPet)
        pets = body.payload
        expect(status).to.be.equal(201)
        expect(body.payload).to.be.an("object")
    })
    it("[PUT] /api/pets/:id - Update pets", async () => {
        const newPet ={
            specie: "Gato",
        }
        const {status, body} = await request.put(`/${pets._id}`).send(newPet)
        pets = body.payload
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("object")
        expect(pets.specie).to.be.equal("Gato")
    })
    it("[DELETE] /api/pets/:id - Delete pets", async () => {
        const {status, body} = await request.delete(`/${pets._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("Pet deleted")
    })
})