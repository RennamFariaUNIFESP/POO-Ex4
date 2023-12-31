System.register(["./rent", "crypto"], function (exports_1, context_1) {
    "use strict";
    var rent_1, crypto_1, App;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rent_1_1) {
                rent_1 = rent_1_1;
            },
            function (crypto_1_1) {
                crypto_1 = crypto_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.users = [];
                    this.bikes = [];
                    this.rents = [];
                }
                registerBike(bike) {
                    for (const rBikes of this.bikes) {
                        if (rBikes.id === bike.id)
                            throw new Error('This bike already have a id.');
                    }
                    bike.id = crypto_1.default.randomUUID();
                    this.bikes.push(bike);
                }
                removeUser(user) {
                    if (this.findUser(user.email) == undefined) {
                        throw new Error('User with this id is not registered');
                    }
                    else {
                        const index = this.users.indexOf(user);
                        if (index != -1)
                            this.users.splice(index, 1);
                    }
                }
                rentBike(user, bike, dateRent, dateFinalRent) {
                    for (const rRent of this.rents) {
                        if (rRent.bike === bike) {
                            throw new Error('The bike is already leased in this date.');
                        }
                    }
                    return rent_1.Rent.create([], bike, user, dateRent, dateFinalRent);
                }
                // outra forma de fazer
                //     if (this.users.some(rUser => { return rUser.email === user.email })) {
                //         throw new Error('User with same email already registered.')
                //     }
                //mesma coisa do que fazer
                //    for(var i = 0; i < this.user.lenght; i++){
                //     if(this.user[i].email == user.email){
                //       throw new Error('Duplicate user.')
                //     }
                //   }
                returnBike(rent, dateReturned) {
                    if ((rent.dateReturned === undefined)) {
                        rent.dateReturned = dateReturned;
                        this.rents.push(rent);
                    }
                    else {
                        throw new Error('This bike already have date returned.');
                    }
                }
                findUser(email) {
                    return this.users.find(user => { user.email === email; });
                }
                registerUser(user) {
                    for (const rUser of this.users) {
                        if (rUser.email === user.email) {
                            throw new Error('Duplicate user.');
                        }
                    }
                    user.id = crypto_1.default.randomUUID();
                    this.users.push(user);
                }
            };
            exports_1("App", App);
        }
    };
});
