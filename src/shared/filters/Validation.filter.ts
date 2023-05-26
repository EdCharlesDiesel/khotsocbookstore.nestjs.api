// import { Catch, RpcExceptionFilter } from '@nestjs/common';
// import { throwError } from 'rxjs';
// import { ValidationException } from '../exceptions/Validation.exception';
//
// @Catch(ValidationException)
// export class ValidationFilter implements RpcExceptionFilter {
//     public catch(exception: ValidationException) {
//         return throwError({
//             error_code: 'VALIDATION_FAILED',
//             error_message: exception.getError(),
//             errors: exception.validationErrors
//         });
//     }
// }
