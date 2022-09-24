import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponse,
} from '@azure/functions';

import { createSubCategory } from './createSubCategory';
import { listSubcategoriesByCategory } from './listSubcategoriesByCategory';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  res: HttpResponse
): Promise<HttpResponse> {
  if (req.method === 'POST') {
    const category = await createSubCategory({
      name: req.body.name,
      categoryId: Number(req.params.id),
    });
    return (res = {
      body: category.body,
      status: Number(category.status) ?? 200,
    });
  }

  if (req.method === 'GET') {
    const subcategories = await listSubcategoriesByCategory({
      categoryId: Number(req.params.id),
    });
    console.log('subcategories', subcategories);
    return (res = {
      body: subcategories.body,
      status: subcategories.status,
    });
  }
};

export default httpTrigger;
