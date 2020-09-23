require("dotenv").config();

const Account = require("../../../entities/accounts/account.model");

const userMocker = require("../../mocks/entities/user.mock");
const accountMocker = require("../../mocks/entities/account.mock");

describe("Like a developer", () => {
  const needParameters = {
    email: "PonnyTheSoulKiller@vendor.com",
    identificationPhone: "3004005060",
    password: "ponnylover",
    pinPass: "0000",
    twoFactorsToken: "twoFactorsToken",
    facebookToken: "facebookToken",
    googleToken: "googleToken",
    twitterToken: "twitterToken",
    isAdmin: true,
    isCustomer: false,
    isVendor: false,
  };

  describe("when I need to create an account", () => {
    it("should save an account in the DB", async () => {
      const owner = await userMocker();

      const response = await Account.create({
        ...needParameters,
        ownerID: owner.id,
      });

      expect(await (await Account.find().exec()).length).toEqual(1);

      expect(response).toHaveProperty("_id");

      expect(response).toHaveProperty("email", needParameters["email"]);
      expect(response).toHaveProperty(
        "identificationPhone",
        needParameters["identificationPhone"]
      );
      expect(response).toHaveProperty("password", needParameters["password"]);
      expect(response).toHaveProperty("pinPass", needParameters["pinPass"]);
      expect(response).toHaveProperty(
        "twoFactorsToken",
        needParameters["twoFactorsToken"]
      );
      expect(response).toHaveProperty(
        "facebookToken",
        needParameters["facebookToken"]
      );
      expect(response).toHaveProperty("googleToken", needParameters["googleToken"]);
      expect(response).toHaveProperty("twitterToken", needParameters["twitterToken"]);
      expect(response).toHaveProperty("isAdmin", needParameters["isAdmin"]);
      expect(response).toHaveProperty("isCustomer", needParameters["isCustomer"]);
      expect(response).toHaveProperty("isVendor", needParameters["isVendor"]);
      expect(response).toHaveProperty("ownerID", owner._id);
    });
    describe("but the email is in use", () => {
      it("should catch the error", async () => {
        await accountMocker({ email: 'usedeamil@vendor.com' })

        const owner = await userMocker()

        try {
          await Account.create({...needParameters, email: 'usedeamil@vendor.com', ownerID: owner._id })
        } catch (failure) {
          expect(failure.errors.email.properties.message).toEqual("email is in use")
        }

      })
    })
  });

  describe("when I need to update an account", () => {
    it("should update an account in the DB", async () => {
      const owner = await userMocker();

      const response = await Account.create({
        ...needParameters,
        ownerID: owner._id
      });

      expect(response).toHaveProperty("_id");

      expect(response).toHaveProperty("email", needParameters["email"]);
      expect(response).toHaveProperty(
        "identificationPhone",
        response["identificationPhone"]
      );
      expect(response).toHaveProperty("password", needParameters["password"]);
      expect(response).toHaveProperty("pinPass", needParameters["pinPass"]);
      expect(response).toHaveProperty(
        "twoFactorsToken",
        needParameters["twoFactorsToken"]
      );
      expect(response).toHaveProperty(
        "facebookToken",
        needParameters["facebookToken"]
      );
      expect(response).toHaveProperty(
        "googleToken",
        needParameters["googleToken"]
      );
      expect(response).toHaveProperty(
        "twitterToken",
        needParameters["twitterToken"]
      );
      expect(response).toHaveProperty("isAdmin", needParameters["isAdmin"]);
      expect(response).toHaveProperty(
        "isCustomer",
        needParameters["isCustomer"]
      );
      expect(response).toHaveProperty("isVendor", needParameters["isVendor"]);
      expect(response).toHaveProperty("ownerID", owner._id);

      const newParameters = {
        ...needParameters,
        email: "otheremail@vendor.com",
        identificationPhone: "2345234523",
        password: "3r3w3r323",
        pinPass: "1114",
        twoFactorsToken: "qwerqwer",
        facebookToken: "asdfasdf",
        googleToken: "zxcvzxcv",
        twitterToken: "qwerqwer",
        isAdmin: false,
        isCustomer: true,
        isVendor: false,
        ownerID: owner.id,
      };

      const updatedAccount = await Account.findByIdAndUpdate(
        response["_id"],
        newParameters,
        { new: true }
      );

      expect(updatedAccount).toHaveProperty("createdAt", expect.any(Date));
      expect(updatedAccount).toHaveProperty("modifiedAt", expect.any(Date));
      expect(updatedAccount).toHaveProperty("email", newParameters["email"]);
      expect(updatedAccount).toHaveProperty(
        "identificationPhone",
        newParameters["identificationPhone"]
      );
      expect(updatedAccount).toHaveProperty(
        "password",
        newParameters["password"]
      );
      expect(updatedAccount).toHaveProperty(
        "pinPass",
        newParameters["pinPass"]
      );
      expect(updatedAccount).toHaveProperty(
        "twoFactorsToken",
        newParameters["twoFactorsToken"]
      );
      expect(updatedAccount).toHaveProperty(
        "facebookToken",
        newParameters["facebookToken"]
      );
      expect(updatedAccount).toHaveProperty(
        "googleToken",
        newParameters["googleToken"]
      );
      expect(updatedAccount).toHaveProperty(
        "twitterToken",
        newParameters["twitterToken"]
      );
      expect(updatedAccount).toHaveProperty(
        "isAdmin",
        newParameters["isAdmin"]
      );
      expect(updatedAccount).toHaveProperty(
        "isCustomer",
        newParameters["isCustomer"]
      );
      expect(updatedAccount).toHaveProperty(
        "isVendor",
        newParameters["isVendor"]
      );
      expect(updatedAccount).toHaveProperty(
        "ownerID",
        owner._id
      );
    });
  });
});
