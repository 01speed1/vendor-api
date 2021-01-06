require("dotenv").config();

const Company = require("../../../src/db/models/company.model");

const userMocker = require("../../mocks/entities/user.mock");
const AccountMocker = require("../../mocks/entities/account.mock");

describe("Like a developer", () => {
    const needParameters = {
        name: "The company name INC",
        identificationNumber: "34543453",
        logoPath: "http://the_path_logo.com",
        ownerID: null,
        staff: [],
    };

    describe("when I need to create a company", () => {
        it("should save a company in the DB", async() => {
            const owner = await userMocker();

            const staffOne = await AccountMocker();
            const staffTwo = await AccountMocker();

            const response = await Company.create({
                ...needParameters,
                ownerID: owner._id,
                staff: [staffOne._id, staffTwo._id],
            });

            expect((await Company.find().exec()).length).toEqual(1);

            expect(response).toHaveProperty("_id");

            expect(response).toHaveProperty("name", response["name"]);
            expect(response).toHaveProperty(
                "identificationNumber",
                response["identificationNumber"]
            );
            expect(response).toHaveProperty("logoPath", response["logoPath"]);
            expect(response["staff"]).toEqual(
                expect.arrayContaining([staffOne._id, staffTwo._id])
            );

            expect(response).toHaveProperty("ownerID", owner._id);
        });
    });


    describe("when I need to update a company", () => {
        it("should update a company in the DB", async() => {
            const owner = await userMocker();

            const staffOne = await AccountMocker();
            const staffTwo = await AccountMocker();

            const response = await Company.create({
                ...needParameters,
                ownerID: owner._id,
                staff: [staffOne._id, staffTwo._id],
            });

            expect(response).toHaveProperty("name", needParameters["name"]);

            const newParameters = {
                ...needParameters,
                name: "the other company name",
                identificationNumber: "756845",
                logoPath: "http://the_path_logo_2.com",
                ownerID: owner._id,
                staff: [staffOne._id, staffTwo._id],
            };

            const updatedAccount = await Company.findByIdAndUpdate(
                response["_id"],
                newParameters, { new: true }
            );

            expect(updatedAccount).toHaveProperty("createdAt", expect.any(Date));
            expect(updatedAccount).toHaveProperty("modifiedAt", expect.any(Date));
            expect(updatedAccount).toHaveProperty("name", newParameters["name"]);
            expect(updatedAccount).toHaveProperty("identificationNumber", newParameters["identificationNumber"]);
            expect(updatedAccount).toHaveProperty("logoPath", newParameters["logoPath"]);
        });
    });
});