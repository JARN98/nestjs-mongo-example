import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: string, req) => {
  const { role, ...result } = req.body;
  return result;
});