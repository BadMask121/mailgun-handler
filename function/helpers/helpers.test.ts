import { formatResponse, serialize } from ".";

test("Run formatResponse test", async () => {
  const response = formatResponse(JSON.stringify({ test: "hello" }), ["value"]);
  expect(response).toMatchObject({
    statusCode: expect.any(Number),
    headers: {
      "Content-Type": expect.any(String),
    },
    isBase64Encoded: expect.any(Boolean),
    body: expect.any(String),
  });
});

test("Run serialize test", async () => {
  const response = serialize(JSON.stringify({ test: "hello" }));
  expect(response).toContain("hello");
});
