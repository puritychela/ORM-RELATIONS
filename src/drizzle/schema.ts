// schema.ts
import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer, boolean, decimal, date } from "drizzle-orm/pg-core";

export const car = pgTable("car", {
  id: serial("id").primaryKey(),
  model: varchar("model", { length: 255 }),
  manufacturer: varchar("manufacturer", { length: 255 }),
  year: integer("year"),
  color: varchar("color", { length: 100 }),
  rentalRate: decimal("rental_rate", { precision: 10, scale: 2 }),
  availability: boolean("availability"),
});

export const customer = pgTable("customer", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  address: varchar("address", { length: 255 }),
});

export const rental = pgTable("rental", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").references(() => car.id),
  customerId: integer("customer_id").references(() => customer.id),
  rentalStartDate: date("rental_start_date"),
  rentalEndDate: date("rental_end_date"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
});

export const payment = pgTable("payment", {
  id: serial("id").primaryKey(),
  rentalId: integer("rental_id").references(() => rental.id),
  paymentDate: date("payment_date"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  paymentMethod: varchar("payment_method", { length: 100 }),
});


//from car to rentals

export const carRentalRelations = relations(car, ({ many }) => ({
  rentals: many(rental), // One car -> many rentals
}));


//one to many relations
//1car <- many rentals
//relation btw car(1) ==> rentals(m)
//from rentals to car(reverse)
export const rentalCarRelation = relations(rental, ({ one }) => ({
  car: one(car, {
    fields: [rental.carId],
    references: [car.id],
  }),
}));

