
const request = require("supertest");
const app = require("../server");

describe("Notes API Tests", () => {

    // Test 1: Health check
    test("GET /health should return healthy", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    // Test 2: Get all notes
    test("GET /notes should return an array", async () => {
        const response = await request(app).get("/notes");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 3: Create a note
    test("POST /notes should create a note", async () => {
        const response = await request(app)
            .post("/notes")
            .send({
                title: "Learn DevOps",
                content: "Building CI/CD pipeline"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Learn DevOps");
    });

    // Test 4: Invalid note
    test("POST /notes should reject invalid data", async () => {
        const response = await request(app)
            .post("/notes")
            .send({
                title: "Learn DevOps"
            });

        expect(response.statusCode).toBe(400);
    });

});
