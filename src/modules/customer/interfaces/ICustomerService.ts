import { Customer } from "../customer.entity";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";


export interface ICustomerService {
    findAll(): Promise<Array<Customer>>;
    findById(id: string): Promise<Customer | null>;
    create(book: CreateCustomerDto): Promise<Customer>;
    update(id: string, newCustomer: UpdateCustomerDto): Promise<Customer | null>;
    delete(id: string): Promise<void>;
}
