import { Context, HttpResponse } from '@azure/functions';
import { client } from '../shared/prisma';
import { AppError } from '../shared/error';

type createCategoryProps = {
  name: string;
  context: Context;
};

async function createCategory({
  name,
  context,
}: createCategoryProps): Promise<HttpResponse> {
  try {
    if (!name) {
      return AppError(400, 'name is required');
    }

    const category = await client.category.findUnique({
      where: {
        name,
      },
    });
    console.log(category);
    if (category) {
      return AppError(409, 'Category name already exists!');
    }

    const newCategory = await client.category.create({
      data: { name },
    });

    return {
      status: 201 /* Defaults to 200 */,
      body: JSON.stringify(newCategory),
    };
  } catch (error) {
    console.log(error);
    return AppError(500, `${error.message}`);
  }
}

export { createCategory };
