// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("check");
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
    return res.status(400).json({ error: 'Invalid page or limit' });
  }

  const users = await prisma.user.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  const totalUsers = await prisma.user.count();

  res.status(200).json({
    users,
    totalPages: Math.ceil(totalUsers / pageSize),
    currentPage: pageNumber,
  });
}
