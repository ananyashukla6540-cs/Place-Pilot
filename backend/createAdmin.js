const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env"
      );
    }

    if (password.length < 12 || password.length > 72) {
      throw new Error("Admin password must be 12 to 72 characters long");
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      if (existingAdmin.role !== "admin") {
        throw new Error(
          "This email already belongs to a non-admin user. Use a different admin email."
        );
      }

      console.log("Admin account already exists. No changes made.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully");
    console.log("Admin email:", email);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();