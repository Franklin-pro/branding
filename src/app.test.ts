import app from "./server"; 
import request from "supertest"; 
import mongoose,{set} from "mongoose"; 
import { response } from "express";

// describe("api endPoint",()=>{
// let token : string;
// let brandId : number;

beforeAll(async () => {
  mongoose
    .connect(
      "mongodb+srv://franklinprogrammer:frank123@frank.badhlha.mongodb.net/brand"
    )
    .then(() => {
      console.log("the database connection was successful");
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("App testing", () => {
    it("Should return success", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
    });
});


describe("App testing", () =>{
  it("Should return success", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
  });
});
describe("blogs testing", () =>{
  it("Should return the blog is found", async () => {
      const res = await request(app).get("/blog");
      expect(res.status).toBe(200);
  });
});
describe("user testing", () =>{
it("Should return that the user created successfully", async () => {
     const res = await request(app).get("/user");
     expect(res.status).toBe(200);
   });
 });
 describe("login testing", () =>{
  it("Should return that the user successfully logged in", async () => {
         const res = await request(app).post("/user/login");
         expect(res.status).toBe(200);
       });
     });
















