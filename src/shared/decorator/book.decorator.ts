import { PipeTransform, createParamDecorator } from '@nestjs/common';

export const Book: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createParamDecorator((data, req) => {
    return req.book;
});
