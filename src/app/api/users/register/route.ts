import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// API route for user registration
export async function POST(req: Request) {
  const { firstName, lastName, email, gender, countryOfOrigin, fieldOfStudy, password } = await req.json();

  // Validate fields
  if (!firstName || !lastName || !email || !gender || !countryOfOrigin || !fieldOfStudy || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  // Simple email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json({ error: 'Password must be 8-15 characters long, and include letters, numbers, and special characters' }, { status: 400 })
  }

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
        image: null, // No image since file upload is removed
      },
    });

    // Respond with success message
    return NextResponse.json({ message: 'Registration successful', user: newUser }, { status: 200 })
  } catch (error) {
    console.log(error)
    // Handle any errors from database insertion
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}
