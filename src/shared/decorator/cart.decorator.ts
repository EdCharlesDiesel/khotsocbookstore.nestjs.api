import { PipeTransform, createParamDecorator } from '@nestjs/common';

export const Cart: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createParamDecorator((data, req) => {
    return req.cart;
});
