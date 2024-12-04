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
    AND: [
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


export async function POST(request: Request) {

  try {
    const body = await request.json(); // Parse the request body
    const { name, description, isEnabled, category } = body;

    // Validate the input
    if (!name) {
      return NextResponse.json(
        { error: 'Name and Image are required fields.' },
        { status: 400 }
      );
    }

    // Create a new category using Prisma
    const newCategory = await prisma.quizSubcategory.create({
      data: {
        name,
        description,
        isEnabled: isEnabled ?? true, // Default to true if not provided
        categoryId: category
      },
    });

    return NextResponse.json({
      message: 'Sub-Category created successfully.',
      subCategory: newCategory,
    });
  } catch (error) {
    console.error('Error creating Sub-category:', error);

    return NextResponse.json(
      { error: 'An error occurred while creating the Sub-category.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Clean up Prisma connection
  }

}
