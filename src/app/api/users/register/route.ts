import { NextResponse } from 'next/server';
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Set up Multer to handle image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/', // Directory where the images will be saved
    filename: (req: any, file: any, cb: any) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Ensure the uploads folder exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up next-connect to handle API routes
const handler = nextConnect();

// Use Multer middleware to handle the file upload
handler.use(upload.single('image'));

// API route for user registration
handler.post(async (req: any, res: any) => {
  const { firstName, lastName, email, gender, countryOfOrigin, fieldOfStudy, password } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !gender || !countryOfOrigin || !fieldOfStudy || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Simple email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'Password must be 8-15 characters long, and include letters, numbers, and special characters' });
  }

  // Get image path after file upload
  const image = req.file ? req.file.path : null;

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const prisma = new PrismaClient();
    // Save user data to the database using Prisma
    const newUser = await prisma.user.create({
      data: {
        typeId: 1,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        countryOfOrigin,
        fieldOfStudy,
        image, // Store image file path in the database
      },
    });

    // Respond with success message
    return res.status(200).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    // Handle any errors from database insertion
    console.error('Error saving user:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

export const POST = handler; // Export the handler as the POST method
