require("dotenv").config();

const User = require("../../../src/db/models/user.model");

describe("Like a developer", () => {
    const neededParameters = {
        name: "PonnyTheSoulKiller@vendor.com",
        lastName: "SoulKiller",
        documentNumber: "23452345",
        contactPhones: ["3004005060", "324563546"],
        imagePath: "http://avatarimages.com/2345",
    };

    describe("when I need to create an user", () => {
        it("should save an user in the DB", async() => {
            const response = await User.create(neededParameters);

            expect(response).toHaveProperty("_id");

            expect(response).toHaveProperty("createdAt", expect.any(Date));
            expect(response).toHaveProperty("name", neededParameters["name"]);
            expect(response).toHaveProperty("lastName", neededParameters["lastName"]);
            expect(response).toHaveProperty(
                "documentNumber",
                neededParameters["documentNumber"]
            );
            expect(response).toHaveProperty(
                "imagePath",
                neededParameters["imagePath"]
            );

            expect(response["contactPhones"]).toEqual(
                expect.arrayContaining(["3004005060", "324563546"])
            );
        });
    });

    describe("when I need to create an user", () => {
        it("should save an user in the DB", async() => {
            let response = await User.create(neededParameters);

            expect(response).toHaveProperty("name", neededParameters["name"]);
            expect(response).toHaveProperty("lastName", neededParameters["lastName"]);
            expect(response).toHaveProperty(
                "documentNumber",
                neededParameters["documentNumber"]
            );
            expect(response).toHaveProperty(
                "imagePath",
                neededParameters["imagePath"]
            );

            expect(response["contactPhones"]).toEqual(
                expect.arrayContaining(["3004005060", "324563546"])
            );

            const newParameters = {
                ...neededParameters,
                name: "DemonMaster",
                lastName: "OfLooneyToons",
                documentNumber: "23452345",
                contactPhones: ["7456", "4566734"],
                imagePath: "http://avatarimages.com/2345",
            };

            updatedUser = await User.findByIdAndUpdate(response["_id"], newParameters, { new: true });

            expect(updatedUser).toHaveProperty("name", newParameters["name"]);
            expect(updatedUser).toHaveProperty("createdAt", expect.any(Date));
            expect(updatedUser).toHaveProperty("lastName", newParameters["lastName"]);
            expect(updatedUser).toHaveProperty(
                "documentNumber",
                newParameters["documentNumber"]
            );
            expect(updatedUser).toHaveProperty(
                "imagePath",
                newParameters["imagePath"]
            );

            expect(updatedUser["contactPhones"]).toEqual(
                expect.arrayContaining(["7456", "4566734"])
            );

        });
    });
});