// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const searchTerm = searchParams.get('search') || ''; // Get the search term

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return NextResponse.json({ error: 'Invalid page or limit' }, { status: 400 });
  }

  // Build the where clause based on the provided conditions
  const whereClause: any = {
    isEnabled: true, // Filter for enabled users
    typeId: 1,      // Filter for specific typeId
    OR: [
      {
        firstName: {
          contains: searchTerm, // Search by name
          mode: 'insensitive',   // Case-insensitive search
        },
      },
      {
        lastName: {
          contains: searchTerm, // Search by name
          mode: 'insensitive',   // Case-insensitive search
        },
      },
      {
        email: {
          contains: searchTerm, // Search by email
          mode: 'insensitive',   // Case-insensitive search
        },
      },
    ],
  };

  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy: {
      id: 'desc', // Sorting by ID in reverse order
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalUsers = await prisma.user.count({
    where: whereClause,
  });

  return NextResponse.json({
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  });
}
