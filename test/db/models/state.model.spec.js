require("dotenv").config();

const State = require("../../../src/db/models/state.model");

describe("Like a developer", () => {
    const neededParameters = {
        description: "A very short description"
    };

    describe("when I need to create a state", () => {
        it("should save a state in the DB", async() => {
            const response = await State.create(neededParameters)

            expect(response).toHaveProperty("_id");

            expect(response).toHaveProperty("description");
        })

    })

    describe("when I need to create a state", () => {
        it("should save a state in the DB", async() => {
            const response = await State.create(neededParameters)

            expect(response).toHaveProperty("description", neededParameters['description']);

            const updatedState = await State.findByIdAndUpdate(response._id, { description: 'a new text' }, { new: true })

            expect(updatedState).toHaveProperty('description', 'a new text')
        })

    })

})