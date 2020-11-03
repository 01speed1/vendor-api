const { encrypt, decrypt, descryptAsync } = require("../../../libs/auth/Encrypter")

describe("Encrypter", () => {
  describe("When need encrypt a value", () => {
    it("should return the encription object", () => {
      const password = "maisupercoolpassguortwowo"

      const response = encrypt(password)

      expect(response).toHaveProperty("IVEncryptKey")
      expect(response).toHaveProperty("encryptedData")
    })
  })

  describe("When need decrypt a value", () => {
    it("should return the value", () => {
      const password = "maisupercoolpassguortwowo"

      const response = encrypt(password)
      const decriptedValue = decrypt(response)

      expect(decriptedValue).toEqual("maisupercoolpassguortwowo")
    })
  })

  describe("When need decrypt a value", () => {
    it("should return async value", () => {
      const password = "maisupercoolpassguortwowo"

      expectedError = {"errorMessage": "description IV key is invalid", "errorSource": "Ecrypter"}

      const response = encrypt(password)
      descryptAsync({...response, IVEncryptKey: undefined})
        .catch( errors => {
          expect(errors).toEqual(expectedError)
        })
    })
  })

  describe("When need decrypt a value", () => {
    it("should return async value", () => {
      const password = "maisupercoolpassguortwowo"

      expectedError = {"errorMessage": "description IV key is invalid", "errorSource": "Ecrypter"}

      const response = encrypt(password)
      descryptAsync({...response, encryptedData: undefined})
        .catch( errors => {
          expect(errors).toEqual(expectedError)
        })
    })
  })
})