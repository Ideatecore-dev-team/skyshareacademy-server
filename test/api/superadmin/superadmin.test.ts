import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../../src/api/app";

describe("GET /", () => {
   it("should return hello MSIM sekai", async () => {
      const response = await request(app).get("/superadmin");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
         data: null,
         message: "hello from superadmin route",
         success: true,
      });
   });
});
