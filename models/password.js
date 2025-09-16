import bcrypt from "bcryptjs";

async function hash(password) {
  const rounds = process.env.NODE_ENV === "production" ? 14 : 1;

  return await bcrypt.hash(password, rounds);
}

async function compare(providedPassword, storePassword) {
  return await bcrypt.compare(providedPassword, storePassword);
}

const password = {
  hash,
  compare,
};

export default password;
