import { createHash } from 'crypto';
import { AppError } from '../shared/error';
import { client } from '../shared/prisma';

type createUserProps = {
  name: string;
  email: string;
  groupId?: string;
};
export async function createUser({ name, email, groupId }: createUserProps) {
  try {
    const emailExists = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log('email => ', emailExists);
    if (emailExists) {
      return AppError(400, 'email already exist');
    }

    const _groupId =
      groupId ??
      (
        await client.group.create({
          data: {
            name: `${email}_${createHash('md5').update(email).digest('hex')}`,
          },
        })
      ).id;

    console.log('_groupId => ', _groupId);
    const user = await client.user.create({
      data: {
        name,
        email,
        groupId: _groupId,
      },
    });
    console.log(user);
    return {
      status: 201,
      body: user,
    };
  } catch (error) {
    console.log(error.message);
    return AppError(500, error.message);
  }
}
