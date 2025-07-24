import request from "supertest";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { app } from "../../../src/api/app";
import {
  createAdmin,
  dataAdmin,
  deleteAdmin,
  createSuperAdminToken,
  createAdminToken,
  createSuperAdmin,
  deleteSuperAdmin,
  createManyAdmins,
  deleteManyAdmin,
  getAdmin,
} from "./admin.utils";

describe("POST /superadmin/admin/create", () => {
  const endpoint = "/superadmin/admin/create";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteAdmin();
    await deleteSuperAdmin();
  });

  it("should respond 201 and create a new admin when request is valid", async () => {
    const res = await request(app)
      .post(endpoint)
      .send(dataAdmin)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Success create new admin");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admin).toBeDefined();
    expect(res.body.data.admin).toHaveProperty("id");
    expect(res.body.data.admin).toHaveProperty("createdAt");
    expect(res.body.data.admin).toHaveProperty("updatedAt");

    expect(res.body.data.admin).toMatchObject({
      email: "test_email_admin@mail.com",
      name: "test_name",
      role: "ADMIN",
    });
  });

  it("should respond 409 if email already exist", async () => {
    await createAdmin();
    const res = await request(app)
      .post(endpoint)
      .send(dataAdmin)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(409);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toBe("Email already exists");
    expect(res.body.success).toBe(false);
  });

  it("should respond 422 if create request empty", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({})
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);

    expect(res.body.data).toEqual({
      email: ["Required"],
      name: ["Required"],
      password: ["Required"],
    });
  });

  it("should respond 401 if token is missing", async () => {
    const res = await request(app).post(endpoint).send(dataAdmin);

    expect(res.status).toBe(401);
    expect(res.body.errors).toBe(true);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthenticated: Token is missing");
  });

  it("should respond 401 if token is invalid", async () => {
    const res = await request(app)
      .post(endpoint)
      .send(dataAdmin)
      // biome-ignore lint/nursery/noSecrets: <explanation>
      .set("Cookie", "authorization=invalid_token");

    expect(res.status).toBe(401);
    expect(res.body.errors).toBe(true);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthenticated: Invalid or expired token");
  });

  it("should respond 401 if Role is not SUPER_ADMIN", async () => {
    const nonSuperAdminToken = await createAdminToken();
    const res = await request(app)
      .post(endpoint)
      .send(dataAdmin)
      .set("Cookie", `authorization=${nonSuperAdminToken}`);

    expect(res.status).toBe(401);
    expect(res.body.errors).toBe(true);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Forbidden: Access denied");
  });
});

describe("GET /superadmin/admin", () => {
  const endpoint = "/superadmin/admin";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    await createManyAdmins();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteSuperAdmin();
    await deleteManyAdmin();
  });

  it("should return 200 and get admins data when request is valid", async () => {
    const res = await request(app)
      .get(endpoint)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success get admin data");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admins[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        email: expect.stringMatching(/@/),
        name: expect.any(String),
        role: "ADMIN",
      }),
    );
    expect(res.body.data.pagination).toEqual(
      expect.objectContaining({
        totalItems: 15,
        totalPages: 2,
        currentPage: 1,
        pageSize: 10,
        totalItemCurrentPage: 10,
      }),
    );
  });

  it("should return 404 if no data admin", async () => {
    await deleteManyAdmin();

    const res = await request(app)
      .get(endpoint)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toBe(true);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Admin not found");
  });
});

describe("GET /superadmin/admin/{adminId}", () => {
  const endpoint = "/superadmin/admin";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    await createAdmin();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteSuperAdmin();
    await deleteManyAdmin();
  });

  it("should return 200 and get admin data by id", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .get(`${endpoint}/${admin?.id}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success get data admin by id");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admin).toBeDefined();
    expect(res.body.data.admin).toHaveProperty("id");
    expect(res.body.data.admin).toHaveProperty("createdAt");
    expect(res.body.data.admin).toHaveProperty("updatedAt");
    expect(res.body.data.admin).toMatchObject({
      email: "test_email_admin@mail.com",
      name: "test_name",
      role: "ADMIN",
    });
  });

  it("should response 422 if admin id invalid", async () => {
    const res = await request(app)
      .get(`${endpoint}/1234567890`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if admin id not found", async () => {
    const res = await request(app)
      .get(`${endpoint}/cmd61m4hq0000tav0q17flh1k`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Admin not found");
    expect(res.body.success).toBe(false);
  });
});

describe("PUT  /superadmin/admin/{adminId}", () => {
  const endpoint = "/superadmin/admin";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    await createAdmin();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteSuperAdmin();
    await deleteManyAdmin();
  });

  it("should return 200 and update data admin by id", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .put(`${endpoint}/${admin?.id}`)
      .send({
        name: "update_test_name",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success update data admin by id");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admin).toBeDefined();
    expect(res.body.data.admin).toHaveProperty("id");
    expect(res.body.data.admin).toHaveProperty("createdAt");
    expect(res.body.data.admin).toHaveProperty("updatedAt");
    expect(res.body.data.admin).toMatchObject({
      email: "test_email_admin@mail.com",
      name: "update_test_name",
      role: "ADMIN",
    });
  });

  it("should return 422 if request is invalid", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .put(`${endpoint}/${admin?.id}`)
      .send({
        name: "",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if admin id not found", async () => {
    const res = await request(app)
      .put(`${endpoint}/cmd61m4hq0000tav0q17flh1k`)
      .send({
        name: "update_test_name",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Admin not found");
    expect(res.body.success).toBe(false);
  });
});

describe("PUT  /superadmin/admin/{adminId}/resetpassword", () => {
  const endpoint = "/superadmin/admin";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    await createAdmin();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteSuperAdmin();
    await deleteManyAdmin();
  });

  it("should return 200 and reset password admin by id", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .put(`${endpoint}/${admin?.id}/resetpassword`)
      .send({
        newPassword: "update_test_password",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success reset password admin by id");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admin).toBeDefined();
    expect(res.body.data.admin).toHaveProperty("id");
    expect(res.body.data.admin).toHaveProperty("createdAt");
    expect(res.body.data.admin).toHaveProperty("updatedAt");
    expect(res.body.data.admin).toMatchObject({
      email: "test_email_admin@mail.com",
      name: "test_name",
      role: "ADMIN",
    });
  });

  it("should return 422 if request is invalid", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .put(`${endpoint}/${admin?.id}/resetpassword`)
      .send({
        password: "",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if admin id not found", async () => {
    const res = await request(app)
      .put(`${endpoint}/cmd61m4hq0000tav0q17flh1k/resetpassword`)
      .send({
        newPassword: "update_test_name",
      })
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Admin not found");
    expect(res.body.success).toBe(false);
  });
});

describe("DELETE  /superadmin/admin/{adminId}", () => {
  const endpoint = "/superadmin/admin";
  let jwtToken: string;

  beforeEach(async () => {
    await createSuperAdmin();
    await createAdmin();
    jwtToken = await createSuperAdminToken();
  });
  afterEach(async () => {
    await deleteSuperAdmin();
    await deleteManyAdmin();
  });

  it("should return 200 and remove admin by id", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .delete(`${endpoint}/${admin?.id}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success remove admin by id");
    expect(res.body.success).toBe(true);

    expect(res.body.data.admin).toBeDefined();
    expect(res.body.data.admin).toHaveProperty("id");
    expect(res.body.data.admin).toHaveProperty("createdAt");
    expect(res.body.data.admin).toHaveProperty("updatedAt");
    expect(res.body.data.admin).toMatchObject({
      email: "test_email_admin@mail.com",
      name: "test_name",
      role: "ADMIN",
    });
  });

  it("should return 422 if request is invalid", async () => {
    const admin = await getAdmin();
    const res = await request(app)
      .put(`${endpoint}/${admin?.id}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(422);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Validation failed ");
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if admin id not found", async () => {
    const res = await request(app)
      .delete(`${endpoint}/cmd61m4hq0000tav0q17flh1k`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toBe(true);
    expect(res.body.message).toContain("Admin not found");
    expect(res.body.success).toBe(false);
  });
});
