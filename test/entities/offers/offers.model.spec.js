require("dotenv").config();

const accountMocker = require("../../mocks/entities/account.mock")
const orderMocker =   require("../../mocks/entities/order.mock")
const stateMocker =   require("../../mocks/entities/state.mock")

const Offer = require("../../../entities/offers/offer.model");

describe("Like a developer", () => {
  const neededParameters = {};

  describe("when I need to create an offer", () => {
    it("should save an offer in the DB", async () => {
      const theAccount = await accountMocker()
      const theOrder   = await orderMocker()
      const theState   = await stateMocker()

      const parametersToCreateAccount = {
        ...neededParameters,
        vendorID: theAccount._id,
        orderID:  theOrder._id,
        stateID:  theState._id
      }

      const response = await Offer.create(parametersToCreateAccount)

      expect(response).toHaveProperty("_id");
      expect(response).toHaveProperty("vendorID", theAccount._id);
      expect(response).toHaveProperty("orderID",  theOrder._id);
      expect(response).toHaveProperty("stateID", theState._id);
    })

  })

})