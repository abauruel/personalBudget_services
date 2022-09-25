import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponse,
} from '@azure/functions';

import { createUser } from './createUser';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  res: HttpResponse
): Promise<HttpResponse> {
  if (req.method === 'POST') {
    const user = await createUser({
      name: req.body.name,
      email: req.body.email,
      groupId: req.body.groupId,
    });
    console.log('user =>>', user);
    return (context.res = user);
  }

  // if (req.method === 'GET') {
  //   const categories = await listCategory();
  //   console.log('categories', categories);
  //   return (res = {
  //     body: categories.body,
  //     status: categories.status,
  //   });
  // }
};

export default httpTrigger;
