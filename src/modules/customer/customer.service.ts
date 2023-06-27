import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICustomerService } from "./interfaces/ICustomerService";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Customer } from "./customer.entity";
import { ICustomer } from "./interfaces/ICustomer";

@Injectable()
export class CustomerService implements ICustomerService {
  uploadImage(file: Express.Multer.File) {
    throw new Error("Method not implemented.");
  }
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  public async findById(id: string): Promise<Customer> {

    const customer = await this.customerRepository.findOneBy({ customer_id: id });
    if (customer) {
      return customer;
    }

    throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }

  public async create(customer: CreateCustomerDto): Promise<Customer| null> {
    const customerToAdd = await this.customerRepository.create(customer);
    await this.customerRepository.save(customerToAdd);

    return customerToAdd;
  }

  public async update(id: string, newCustomer: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findBy({ customer_id: id });
    if (!customer) {
      throw new Error("The customer was not found.");
    } else {
      await this.customerRepository.update(id, newCustomer);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }

}

