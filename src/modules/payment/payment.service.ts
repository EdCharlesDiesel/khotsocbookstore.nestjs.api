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
  constructor(@InjectRepository(Payment) private readonly bookRepository: Repository<Payment>) {
  }

  findAll(): Promise<Payment[]> {
    return this.bookRepository.find();
  }

  public async findById(id: string): Promise<Payment> {

    const book = await this.bookRepository.findOneBy({ id });
    if (book) {
      return book;
    }

    throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
  }

  public async create(book: CreatePaymentDto): Promise<Payment> {
    const bookToAdd = await this.bookRepository.create(book);
    await this.bookRepository.save(bookToAdd);

    return bookToAdd;
  }

  public async update(id: string, newPayment: UpdatePaymentDto): Promise<Payment> {
    const book = await this.bookRepository.findBy({ id });
    if (!book) {
      throw new Error("The book was not found.");
    } else {
      await this.bookRepository.update(id, newPayment);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

}

