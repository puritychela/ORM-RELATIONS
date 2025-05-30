"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.rental = exports.customer = exports.car = void 0;
// schema.ts
const pg_core_1 = require("drizzle-orm/pg-core");
exports.car = (0, pg_core_1.pgTable)("car", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    model: (0, pg_core_1.varchar)("model", { length: 255 }),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 255 }),
    year: (0, pg_core_1.integer)("year"),
    color: (0, pg_core_1.varchar)("color", { length: 100 }),
    rentalRate: (0, pg_core_1.decimal)("rental_rate", { precision: 10, scale: 2 }),
    availability: (0, pg_core_1.boolean)("availability"),
});
exports.customer = (0, pg_core_1.pgTable)("customer", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 100 }),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 100 }),
    email: (0, pg_core_1.varchar)("email", { length: 255 }),
    phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 20 }),
    address: (0, pg_core_1.varchar)("address", { length: 255 }),
});
exports.rental = (0, pg_core_1.pgTable)("rental", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    carId: (0, pg_core_1.integer)("car_id").references(() => exports.car.id),
    customerId: (0, pg_core_1.integer)("customer_id").references(() => exports.customer.id),
    rentalStartDate: (0, pg_core_1.date)("rental_start_date"),
    rentalEndDate: (0, pg_core_1.date)("rental_end_date"),
    totalAmount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }),
});
exports.payment = (0, pg_core_1.pgTable)("payment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    rentalId: (0, pg_core_1.integer)("rental_id").references(() => exports.rental.id),
    paymentDate: (0, pg_core_1.date)("payment_date"),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }),
    paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 100 }),
});
