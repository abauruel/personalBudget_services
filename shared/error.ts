/**
 * file: shared/error.ts
 * date: 21/09/2022
 * author: Alex Claude
 */

type AppErrorProps = {
  status: number;
  message: string;
};

function AppError(status = 400, message: string) {
  return {
    status: status,
    body: JSON.stringify({ message: message }),
  };
}

export { AppError };
