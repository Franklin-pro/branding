import app from "./server";
import request from "supertest";
import mongoose from "mongoose";

beforeAll(async () => {
    mongoose
      .connect(
        "mongodb://localhost:27017/my_brand"
      )
      .then(() => {
        console.log("the database connection was successful");
      });
});

describe("App testing", () =>{
    it("Should return success", async () => {
        const res = await request(app).get("/");
        expect(res.status).toEqual(200);
    });
});