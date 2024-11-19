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
  const whereClause: Prisma.QuizCategoryWhereInput = {
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

  const categories = await prisma.quizCategory.findMany({
    where: whereClause,
    orderBy: {
      id: 'desc', // Sorting by ID in reverse order
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalCategories = await prisma.quizCategory.count({
    where: whereClause,
  });

  return NextResponse.json({
    categories,
    totalPages: Math.ceil(totalCategories / limit),
    currentPage: page,
  });
}

export async function POST(request: Request) {

  try {
    const body = await request.json(); // Parse the request body
    const { name, description, isEnabled } = body;

    // Validate the input
    if (!name) {
      return NextResponse.json(
        { error: 'Name and Image are required fields.' },
        { status: 400 }
      );
    }

    // Create a new category using Prisma
    const newCategory = await prisma.quizCategory.create({
      data: {
        name,
        description,
        isEnabled: isEnabled ?? true, // Default to true if not provided
      },
    });

    return NextResponse.json({
      message: 'Category created successfully.',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating the category.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Clean up Prisma connection
  }

}
