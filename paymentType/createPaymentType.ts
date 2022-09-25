import { HttpResponse } from '@azure/functions';
import { AppError } from '../shared/error';
import { client } from '../shared/prisma';

type createPaymentTypeProps = {
  name: string;
};
export async function createPaymentType({
  name,
}: createPaymentTypeProps): Promise<HttpResponse> {
  try {
    const checkPaymentTypeName = await client.paymentType.findUnique({
      where: { name },
    });

    if (checkPaymentTypeName) {
      throw new Error('payment type name already exists');
    }

    const paymentType = await client.paymentType.create({
      data: {
        name,
      },
    });
    return {
      status: 201,
      body: paymentType,
    };
  } catch (error) {
    console.log('error=>', error);
    return AppError(500, error.message);
  }
}
