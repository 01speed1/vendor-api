require("dotenv").config();

const Order = require("../../../src/entities/orders/order.model");

describe("Like a developer", () => {
  const neededParameters = {
    location:       {type: "Point", coordinates: [5, -74] },
    address:        "Calle falsa 123",
    products:       ["Milk", "Tomates"],
    services:       ["Cooking", "Washing"],
    deliverDetails: "sum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la impre"
  };

  describe("when I need to create an order", () => {
    it("should save an order in the DB", async () => {
      const response = await Order.create(neededParameters)

      expect(response).toHaveProperty("_id");

      expect(response).toHaveProperty("location");
      expect(response['location']).toHaveProperty("type", neededParameters['location']['type']);
      expect(response['location']['coordinates']).toEqual(expect.arrayContaining([5, -74]))

      expect(response).toHaveProperty("address", neededParameters['address']);
      expect(response).toHaveProperty("products", expect.arrayContaining(["Milk", "Tomates"]));
      expect(response).toHaveProperty("services", expect.arrayContaining(["Cooking", "Washing"]));

      expect(response).toHaveProperty("deliverDetails", neededParameters['deliverDetails']);
    })

  })

  describe("when I need to create an order", () => {
    it("should save an order in the DB", async () => {
      const response = await Order.create(neededParameters)

      expect(response).toHaveProperty("deliverDetails", neededParameters['deliverDetails']);

      const updatedOrder = await Order.findByIdAndUpdate(response._id, { deliverDetails: 'a new text' }, { new: true })

      expect(updatedOrder).toHaveProperty('deliverDetails', 'a new text')

    })

  })

})