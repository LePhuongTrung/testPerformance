const request = require("supertest");

const app = require("../app");
const DB = require("../Database/connect");
const repository = require("../Repository/RoomRepository");

const mockData = {
  roomNumber: 789,
  type: "surgical disease",
  DoctorName: "Nguyen Hai Long",
  isPrioritized: true,
};

beforeAll(async () => {
  jest.setTimeout(60000);
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

describe("POST /room/Create ", () => {
  test("return response status is 403 and send Missing required information", async () => {
    const response = await request(app)
      .post("/room/Create")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .send({ fullName: "Le Phuong Trung" })
      .set("Accept", "application/json");

    expect(response.status).toBe(403);
    expect(response.text).toBe("Missing required information");
  });
  test("return response status is 403 and send The room already exists", async () => {
    const response = await request(app)
      .post("/room/Create")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .send({
        roomNumber: 2,
        type: "surgical disease",
        DoctorName: "Nguyen Hai Long",
        isPrioritized: true,
      })
      .set("Accept", "application/json");
    expect(response.status).toBe(403);
    expect(response.text).toBe("The room already exists");
  });
  test("Test no permission", async () => {
    const response = await request(app)
      .post("/room/Create")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR3SlkyNlUudE9XLnhGUVd1UDlHUThPMVFPWjc2a0VxLnBvU2JBVnI4YmpzQW1FZUpPRmNXdSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjcwNTg5ODU1fQ.OE1-l4d5RR06VeFbyatXlP24Kh6SX9xj0b0A5aIpEcw",
      ])
      .send(mockData)
      .set("Accept", "application/json");
    expect(response.status).toBe(403);
    expect(response.text).toBe("You are not MANAGER");
  });

  test("return response status is 200", async () => {
    const response = await request(app)
      .post("/room/Create")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .send(mockData)
      .set("Accept", "application/json");
    const find = await repository.findOne(response.body.roomNumber);
    await repository.deleteRoom(find._id);
    expect(response.status).toBe(200);
  });
});

describe("GET /room/findAll/1/5 ", () => {
  test("return response status is 200", async () => {
    const response = await request(app)
      .get("/room/findAll/1/10")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.docs).not.toBe(0);
  });
});

describe("GET /room/findAllWithFilter/1/5 ", () => {
  test("return response status is 403 and send Please select filter information", async () => {
    const response = await request(app)
      .post("/room/findAllWithFilter/1/5")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .set("Accept", "application/json");

    expect(response.status).toBe(403);
    expect(response.text).toBe("Please select filter information");
  });
  test("return response status is 200", async () => {
    const response = await request(app)
      .post("/room/findAllWithFilter/1/5")
      .set("Cookie", [
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5nMDgyNDAxMzg3NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJNE1KdmhaMjJ3Vm5UMUIyTjUybVkuY1dOVFBTWnZyd28ybEJVTUxNNi5KRjducC9ITWYuVyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjcwNTYyMDY2fQ.uPxNwdyp93P24j3tZoYf3Z4SyILqd146ygY5Q7_CC58",
      ])
      .send({
        type: "internal diseases",
        isPrioritized: true,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});
