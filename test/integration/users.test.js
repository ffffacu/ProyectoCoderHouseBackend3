import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api");

describe("Test integration Users", () => {
    let users;
    it("[GET] /api/users - Array of users", async () => {
        const {status, body} = await request.get("/users")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array")       
    })
    it("[POST]  /api/sessions/register - New Users", async () => {
        const newUser ={
            first_name: "John",
            last_name: "Doe",
            email: "0qV9B22@example.com",
            password: "coder12345",
        }
        const {status,body} = await request.post("/sessions/register").send(newUser)
        users = body.payload
        expect(status).to.be.equal(201)
        expect(body.payload).to.be.an("object")
        expect(body.payload.email).to.be.equal("0qV9B22@example.com")
        expect(body.payload.first_name).to.be.equal("John")
        expect(body.payload.last_name).to.be.equal("Doe")
    })
    it("[GET] /api/users/:uid - User", async () => {
        const {status, body} = await request.get(`/users/${users._id}`)
        expect(status).to.be.equal(200)
    })
    it("[PUT] /api/users/:id - Update user", async () => {
        const newUser = {
            first_name: "Pepe",
            last_name: "Perez",
        }
        const {status, body} = await request.put(`/users/${users._id}`).send(newUser)
        expect(status).to.be.equal(200)
        expect(body.payload.first_name).to.be.equal("Pepe")
        expect(body.payload.last_name).to.be.equal("Perez")
    })
    it("[DELETE] /api/users/:id - Delete user", async () => {
        const {status, body} = await request.delete(`/users/${users._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("User deleted")
    })
})