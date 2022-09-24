import { AppError } from '../shared/error';
import { client } from '../shared/prisma';

async function listCategory() {
  try {
    const categories = await client.category.findMany({
      include: {
        SubCategory: true,
      },
    });
    return { body: categories, status: 200 };
  } catch (error) {
    console.log(error);
    return AppError(500, `${error.message}`);
  }
}

export { listCategory };
