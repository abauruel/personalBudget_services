import { Context, HttpResponse } from '@azure/functions';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/error';
import { client } from '../shared/prisma';

async function listCategory() {
  try {
    const categories = await client.category.findMany();
    return { body: categories, status: 200 };
  } catch (error) {
    console.log(error);
    return AppError(500, JSON.stringify(error));
  }
}

export { listCategory };
