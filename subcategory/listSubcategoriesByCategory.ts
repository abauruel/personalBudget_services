import { AppError } from '../shared/error';
import { client } from '../shared/prisma';
type listSubcategoriesByCategoryProps = {
  categoryId: number;
};
async function listSubcategoriesByCategory({
  categoryId,
}: listSubcategoriesByCategoryProps) {
  try {
    const subcategories = await client.subCategory.findMany({
      where: {
        categoryId,
      },
    });
    return { body: subcategories, status: 200 };
  } catch (error) {
    console.log(error);
    return AppError(500, `${error.message}`);
  }
}

export { listSubcategoriesByCategory };
