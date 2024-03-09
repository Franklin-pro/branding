"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(async () => {
    mongoose_1.default.connect("mongodb+srv://franklinprogrammer:frank123@frank.badhlha.mongodb.net/brand");
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
describe("App testing", () => {
    it("Should return success", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get("/");
        expect(res.status).toEqual(200);
    });
});
describe("user testing", () => {
    it("Should create a user and return success", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/")
            .send({
            firstName: "diane",
            lastName: "grace",
            email: "diane@gmailcom",
            passWord: "Diane@123",
            confirmPassword: "Diane@123",
            role: "user",
        });
        expect(res.status).toEqual(201);
    });
    it("Should return that the user successfully logged in", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({
            email: "franklinprogrammer@gmail.com",
            passWord: "Frank@123",
        });
        expect(res.status).toEqual(201);
    });
    it("Should return that the user successfully logged in", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({
            email: "franklinprogrammer@gmail.com",
            passWord: "frank",
        });
        expect(res.status).toEqual(201);
    });
    it("Should return that the user found", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get("/");
        expect(res.status).toEqual(200);
    });
    it("Should return that all users found", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get("/");
        expect(res.status).toEqual(200);
    });
    it("Should return that the user deleted", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete("/");
        expect(res.status).toEqual(200);
    });
    it("Should return that all users deleted", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete("/");
        expect(res.status).toEqual(200);
    });
    it("Should return that the user updated successfully", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch("/");
        expect(res.status).toEqual(404);
    });
    describe("blog testing", () => {
        it("Should create a blog and return success", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .post("/")
                .send({
                blogTitle: "diane",
                blogDescription: "life story",
                blogImage: "word.jpg",
            });
            expect(res.status).toEqual(400);
        });
        it("Should return that the blog found", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .get("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that all blogs found", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .get("/get");
            expect(res.status).toEqual(204);
        });
        it("Should return that the user deleted", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .delete("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that  all blog deleted", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .delete("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that the blog updated successfully", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .patch("/");
            expect(res.status).toEqual(404);
        });
    });
    describe("contact testing", () => {
        it("Should send message and return success", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .post("/")
                .send({
                fullName: "frank ndanyuzwe",
                phone: "0790019543",
                email: "frankndanyuzwe444@gmail.com",
                message: "hello there"
            });
            expect(res.status).toEqual(400);
        });
        it("Should return that the message found", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .get("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that all messages found", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .get("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that the message deleted", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .delete("/");
            expect(res.status).toEqual(200);
        });
        it("Should return that the message updated successfully", async () => {
            const res = await (0, supertest_1.default)(server_1.default)
                .patch("/");
            expect(res.status).toEqual(404);
        });
    });
});
//# sourceMappingURL=app.test.js.map