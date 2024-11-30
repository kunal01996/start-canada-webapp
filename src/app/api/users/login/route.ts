import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // If user is not found, return an error response
    if (!user) {
      return NextResponse.json(
        {
          data: { message: 'Invalid email or password' }
        },
        { status: 400 }
      );
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect, return an error response
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          data: {
          message: 'Invalid email or password' }
        },
        { status: 400 }
      );
    }

    // Create JWT token (optional, if you're using JWT for authentication)
    const token = jwt.sign(
      {
        userId: user.id,
        typeId: user.typeId,
        email: user.email,
      },
      process.env.JWT_SECRET as string, // Ensure you have a JWT_SECRET in .env
      { expiresIn: '365d' }
    );

    const res = {
      message: 'Login successful',
      typeId: user,
      token: token, // You can remove this if you're not using JWT tokens
    } as {
      message: string;
      typeId: Database.User;
      token: string
    };
    console.log("check", res);

    // Return user data and the JWT token
    return NextResponse.json({
      message: 'Login successful',
      typeId: user.typeId,
      token: token, // You can remove this if you're not using JWT tokens
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
