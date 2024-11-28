import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

// POST method to handle user registration
export async function POST(req: Request) {
  try {
    // Parse the JSON data from the request body using the new Next.js 13 method
    const parsedData = await req.json();

    const { firstName, lastName, email, gender, countryOfOrigin, fieldOfStudy, password } = parsedData;

    // Validate fields
    if (!firstName || !lastName || !email || !gender || !countryOfOrigin || !fieldOfStudy || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
    if (!passwordRegex.test(password)) {
      return new Response(JSON.stringify({ error: 'Password must be 8-15 characters long, with letters, numbers, and special characters' }), { status: 400 });
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database (without image handling)
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
      },
    });

    console.log("user", newUser);

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Registration successful', user: newUser }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    // Return error response
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
