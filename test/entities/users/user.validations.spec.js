const { creationParametersValidator } = require("../../../src/entities/users/user.validations")

describe("creationParametersValidator", () => {
  describe("when receive the correct params", () => {

    const requiredParameters = {
      name: "PonnyTheSoulKiller@vendor.com",
      lastName: "SoulKiller",
      documentNumber: "23452345",
      contactPhones: ["3004005060", "324563546"],
      imagePath: "http://avatarimages.com/2345",
    }

    it("should return the params", async () => {
      const response = await creationParametersValidator(requiredParameters)

      expect(response).toEqual(requiredParameters)
    })
  })

  describe("with the incorrect params", () => {
    it("should return the errors", () => {
      const response = creationParametersValidator({ contactPhones: "435345" })

      const expectedErrors = {
        name: [ 'The name field is required.' ],
        lastName: [ 'The lastName field is required.' ],
        contactPhones: ["The contactPhones attribute has errors."]
      }

      response.catch( errors => {
          expect(errors).toEqual(expectedErrors)
        } )
    })
  })
})
