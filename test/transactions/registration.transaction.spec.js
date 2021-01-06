const Account = require('../../src/db/models/account.model');
const User = require('../../src/db/models/user.model');
const {
    RegistrationTransaction,
} = require('../../src/transactions/registration.transaction');

describe('Like a developer, I want to register a new user', () => {
    const requiredParameters = {
        email: 'elsopas@mail.com',
        password: 'supersecurepassword',
        password_confirmation: 'supersecurepassword',
        name: 'Main Neimis',
        lastName: 'Itsafa kerneim',
    };

    describe('When all params are correct', () => {
        it('should create an account with linked user', async() => {
            const parameters = {...requiredParameters };

            await RegistrationTransaction(parameters);

            const expectedUser = await User.findOne({
                name: requiredParameters['name'],
            });

            const expectedAccount = await Account.findOne({
                ownerID: expectedUser['_id'],
            });

            expect((await Account.find()).length).toEqual(1);

            expect(expectedAccount).toHaveProperty('_id');
        });

        it('should be create user', async() => {
            const parameters = {...requiredParameters };

            await RegistrationTransaction(parameters);

            expect((await User.find()).length).toEqual(1);
        });

        it('should return a session token', async() => {
            const response = await RegistrationTransaction(requiredParameters);

            expect(response).toHaveProperty('token');
        });
    });

    describe('When parameters are incomplete', () => {
        it('should return a reject promise', () => {
            const response = RegistrationTransaction();

            const expectedError = {
                email: ['The email field is required.'],
                password: ['The password field is required.'],
                password_confirmation: ['The password confirmation field is required.'],
            };

            response.catch((errors) => {
                expect(errors).toEqual(expectedError);
            });
        });

        describe('When email is not sent', () => {
            it('should return a reject promise', async() => {
                const response = RegistrationTransaction({
                    ...requiredParameters,
                    email: 'blaemail@email.com',
                    password: '234234234',
                    password_confirmation: '234234231',
                });

                const expectedError = {
                    password: ['The password confirmation does not match.'],
                };

                await expect(response).rejects.toEqual(expectedError);
            });
        });
    });
});