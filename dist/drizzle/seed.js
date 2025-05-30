"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/drizzle/seed.ts
const db_1 = __importDefault(require("./db"));
const schema_1 = require("./schema");
async function seed() {
    // Insert into car table
    const insertedCars = await db_1.default
        .insert(schema_1.car)
        .values([
        {
            model: "Civic",
            manufacturer: "Honda",
            year: 2022,
            color: "Red",
            rentalRate: "40.00",
            availability: true,
        },
        {
            model: "Corolla",
            manufacturer: "Toyota",
            year: 2021,
            color: "Blue",
            rentalRate: "35.00",
            availability: true,
        },
    ])
        .returning();
    // Insert into customer table
    const insertedCustomers = await db_1.default
        .insert(schema_1.customer)
        .values([
        {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice@example.com",
            phoneNumber: "1234567890",
            address: "Nairobi",
        },
        {
            firstName: "Bob",
            lastName: "Jones",
            email: "bob@example.com",
            phoneNumber: "9876543210",
            address: "Mombasa",
        },
    ])
        .returning();
    // Insert into rental table
    const insertedRentals = await db_1.default
        .insert(schema_1.rental)
        .values([
        {
            carId: insertedCars[0].id,
            customerId: insertedCustomers[0].id,
            rentalStartDate: new Date("2025-05-20").toISOString(),
            rentalEndDate: new Date("2025-05-25").toISOString(),
            totalAmount: "200.00",
        },
        {
            carId: insertedCars[1].id,
            customerId: insertedCustomers[1].id,
            rentalStartDate: new Date("2025-05-22").toISOString(),
            rentalEndDate: new Date("2025-05-24").toISOString(),
            totalAmount: "70.00",
        },
    ])
        .returning();
    // Insert into payment table
    await db_1.default.insert(schema_1.payment).values([
        {
            rentalId: insertedRentals[0].id,
            paymentDate: new Date("2025-05-25").toISOString(),
            amount: "200.00",
            paymentMethod: "Credit Card",
        },
        {
            rentalId: insertedRentals[1].id,
            paymentDate: new Date("2025-05-24").toISOString(),
            amount: "70.00",
            paymentMethod: "Mobile Money",
        },
    ]);
    console.log("✅ Seeding completed successfully!");
}
seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
