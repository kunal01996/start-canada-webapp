import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

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
  const whereClause: Prisma.QuizSubcategoryWhereInput = {
    isEnabled: true,
    OR: [
      {
        name: {
          contains: searchTerm, // Search by name
          mode: 'insensitive',   // Case-insensitive search
        },
      }
    ],
  };

  const subCategories = await prisma.quizSubcategory.findMany({
    where: whereClause,
    orderBy: {
      id: 'desc', // Sorting by ID in reverse order
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
        category: {
          select: {
            id: true,
            name: true, // Include the category name
          },
        },
      },
  });

  const totalSubCategories = await prisma.quizSubcategory.count({
    where: whereClause,
  });

  return NextResponse.json({
    subCategories,
    totalPages: Math.ceil(totalSubCategories / limit),
    currentPage: page,
  });
}
