import { Payment } from "../payment.entity";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";


export interface IPaymentService {
    findAll(): Promise<Array<Payment>>;
    findById(id: string): Promise<Payment | null>;
    create(book: CreatePaymentDto): Promise<Payment>;
    update(id: string, newPayment: UpdatePaymentDto): Promise<Payment | null>;
    delete(id: string): Promise<void>;
}
