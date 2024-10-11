// lib/dbConnect.js

import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        // Admin User Creation Logic
        const adminUsername = 'msbs';
        const adminPassword = 'SigmaMax';

        const adminUser = await User.findOne({ username: adminUsername });

        if (!adminUser) {
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          await User.create({
            username: adminUsername,
            password: hashedPassword,
            flatNumber: 'Admin',
            isAdmin: true,
          });
          console.log(`Admin user created with username: ${adminUsername}`);
        } else {
          console.log('Admin user already exists.');
        }

        return mongoose;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    })();
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
