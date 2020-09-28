const { JWTBuilder } = require("../../../libs/auth/JWTBuilder")

describe("JWTBuilder", () => {
  describe("When the developer need a json web token", () => {
    it("should be created with the right params", async () => {
      const payload = {
        username: "somebody",
        email:    "somemail@mail.com"
      }

      const response = await JWTBuilder({payload})

      expect(response).toHaveProperty("token")
    })
  })

  describe("When developer does not send a payload", () => {
    it("should return a object with error", async () => {
      const response = JWTBuilder()

      await expect(response).rejects.toHaveProperty("error", "payload no found to create token")
    })
  })
})