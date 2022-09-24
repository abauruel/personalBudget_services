import { HttpResponse } from '@azure/functions';
import { AppError } from '../shared/error';
import { client } from '../shared/prisma';
type createSubcategoryProps = {
  categoryId: number;
  name: string;
};

export async function createSubCategory({
  categoryId,
  name,
}: createSubcategoryProps): Promise<HttpResponse> {
  try {
    await client.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

    const subcategory = await client.subCategory.create({
      data: {
        name,
        categoryId,
      },
    });
    return {
      status: 201 /* Defaults to 200 */,
      body: JSON.stringify(subcategory),
    };
  } catch (error) {
    console.log(error);
    return AppError(500, `${error.message}`);
  }
}
