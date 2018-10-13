import petfinderClient from "petfinder-client";

export const petfinder = petfinderClient({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
