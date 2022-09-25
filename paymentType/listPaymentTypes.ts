import { HttpResponse } from '@azure/functions';
import { AppError } from '../shared/error';
import { client } from '../shared/prisma';

export async function listPaymentTypes(): Promise<HttpResponse> {
  try {
    const paymentTypes = await client.paymentType.findMany();
    return {
      body: paymentTypes,
    };
  } catch (error) {
    console.log(error.message);
    AppError(500, error.message);
  }
}
