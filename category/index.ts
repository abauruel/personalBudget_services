import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponse,
} from '@azure/functions';

import { createCategory } from './createCategory';
import { listCategory } from './listCategory';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  res: HttpResponse
): Promise<HttpResponse> {
  if (req.method === 'POST') {
    const category = await createCategory({
      name: req.body.name,
      context,
    });
    return (res = {
      body: category.body,
      status: Number(category.status) ?? 200,
    });
  }

  if (req.method === 'GET') {
    const categories = await listCategory();
    console.log('categories', categories);
    return (res = {
      body: categories.body,
      status: categories.status,
    });
  }
};

export default httpTrigger;
