// lib/dbConnect.js
import mongoose from 'mongoose';
import User from '../models/User'; // Ensure this import is present
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(async (mongoose) => {
      // **Admin User Creation Logic**
      try {
        const adminUsername = 'admin';
        const adminPassword = 'adminpass';

        // Check if admin user exists
        const adminUser = await User.findOne({ username: adminUsername });

        if (!adminUser) {
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          await User.create({
            username: adminUsername,
            password: hashedPassword,
            flatNumber: 'Admin',
            isAdmin: true,
          });
          console.log(`Default admin user created with username: ${adminUsername} and password: ${adminPassword}`);
        } else {
          console.log('Admin user already exists.');
        }
      } catch (error) {
        console.error('Error creating default admin user:', error);
      }

      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
