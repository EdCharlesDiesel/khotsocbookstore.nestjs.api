import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPaymentService } from "./interfaces/IPaymentService";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./payment.entity";


@Injectable()
export class PaymentService implements IPaymentService {
  constructor(@InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>) {
  }

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  public async findById(id: string): Promise<Payment> {

    const payment = await this.paymentRepository.findOneBy({ payment_id: id });
    if (payment) {
      return payment;
    }

    throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
  }

  public async create(payment: CreatePaymentDto): Promise<Payment> {
    const paymentToAdd = await this.paymentRepository.create(payment);
    await this.paymentRepository.save(paymentToAdd);

    return paymentToAdd;
  }

  public async update(id: string, newPayment: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.findBy({ payment_id: id });
    if (!payment) {
      throw new Error("The payment was not found.");
    } else {
      await this.paymentRepository.update(id, newPayment);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.paymentRepository.delete(id);
  }

}

