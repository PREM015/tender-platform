// userModel.js - placeholder
import db from "../config/db.js";

export async function createUser(email, hashedPassword) {
  const [user] = await db("users").insert({ email, password: hashedPassword }).returning("*");
  return user;
}

export async function findUserByEmail(email) {
  const user = await db("users").where({ email }).first();
  return user;
}

export async function findUserById(id) {
  const user = await db("users").where({ id }).first();
  return user;
}
