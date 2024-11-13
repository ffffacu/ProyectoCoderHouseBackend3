import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api");

describe("Test integration Sessions", () => {
    let users;
    let authCookie;
    it("[POST]  /api/sessions/register - New Users", async () => {
        const newUser ={
            first_name: "John",
            last_name: "Doe",
            email: "0qV9B222@example.com",
            password: "coder12345",
        }
        const {body} = await request.post("/sessions/register").send(newUser)
        users = body.payload
    })
    it("[POST] /api/sessions/login - Login", async () => {
        const newSession = {
            email: users.email,
            password: "coder12345",
        };
        const loginResponse = await request.post("/sessions/login").send(newSession);
        authCookie = loginResponse.headers["set-cookie"][0]; 
        expect(loginResponse.body.message).to.be.equal("Logged in");
        expect(loginResponse.status).to.be.equal(201);
    });
    it("[DELETE] /api/users/:id - Delete user", async () => {
        const {status, body} = await request.delete(`/users/${users._id}`)
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("User deleted")
    })
})