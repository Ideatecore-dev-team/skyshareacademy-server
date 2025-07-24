import request from "supertest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createAdmin, dataLogin, deleteAdmin } from "./auth.utils";
import { app } from "../../../src/api/app";

describe("POST /login", () => {
  const endpoint = "/login";

  beforeEach(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAdmin();
  });

  it("should return 200 and JWT token if login credentials are valid", async () => {
    const res = await request(app).post(endpoint).send(dataLogin);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success login");
    expect(res.body.success).toBe(true);

    expect(res.body.data.token).toBeDefined();
  });

  it("should return 422 and error validation if login credentials are empty", async () => {
    const res = await request(app).post(endpoint).send({ email: "", password: "" });

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);
  });

  it("should return 401 and error authentication if login credentials email are not valid", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "wrongeamil@mail.com", password: dataLogin.password });

    expect(res.status).toBe(401);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Email or Password is wrong");
    expect(res.body.success).toBe(false);
  });

  it("should return 401 and error authentication if login credentials Password are not valid", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: dataLogin.email, password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Email or Password is wrong");
    expect(res.body.success).toBe(false);
  });
});

describe("POST /logout", () => {
  const loginEndpoint = "/login";
  const logoutEndpoint = "/logout";
  let cookie: string;

  beforeEach(async () => {
    await createAdmin();
    const login = await request(app).post(loginEndpoint).send(dataLogin);
    cookie = login.headers["set-cookie"][0]; // Get JWT cookie
  });

  afterEach(async () => {
    await deleteAdmin();
  });

  it("should return 200 and clear cookie when authenticated", async () => {
    const res = await request(app).post(logoutEndpoint).set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: null,
      message: "Success logout",
      success: true,
    });
  });

  it("should return 401 if token is missing", async () => {
    const res = await request(app).post(logoutEndpoint);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Unauthenticated");
  });
});
