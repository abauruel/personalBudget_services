import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponse,
} from '@azure/functions';

import { createPaymentType } from './createPaymentType';
import { listPaymentTypes } from './listPaymentTypes';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  res: HttpResponse
): Promise<HttpResponse> {
  if (req.method === 'POST') {
    const paymentType = await createPaymentType({
      name: req.body.name,
    });
    return (res = {
      body: paymentType.body,
      status: Number(paymentType.status) ?? 200,
    });
  }

  if (req.method === 'GET') {
    const paymentTypes = await listPaymentTypes();
    return (res = {
      body: paymentTypes.body,
    });
  }
};

export default httpTrigger;
