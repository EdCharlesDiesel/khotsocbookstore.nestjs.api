// import {
//     Injectable,
//     ValidationPipe,
//     PipeTransform,
//     ArgumentMetadata,
//     BadRequestException
// } from '@nestjs/common';
// import { ValidationException } from '../exceptions/Validation.exception';
//
// @Injectable()
// export class ValidationPipe extends ValidationPipe
//     implements PipeTransform<any> {
//     public async transform(value: any, metadata: ArgumentMetadata) {
//         try {
//             await super.transform(value, metadata);
//         } catch (error) {
//             if (error instanceof BadRequestException) {
//                 throw new ValidationException(error.message);
//             }
//
//             throw error;
//         }
//
//         return value;
//     }
// }
