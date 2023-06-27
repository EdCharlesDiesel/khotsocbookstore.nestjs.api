import {
    Column,
    Entity, JoinColumn, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Customer } from "../customer/customer.entity";


@Entity('Country')
export class Country {
    @PrimaryGeneratedColumn("uuid")
    public country_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;

    @Column("varchar", { length: 200 },)
    public code?: string;

    @OneToOne(() => Customer, (customer) => customer.country) // specify inverse side as a second parameter
    customer: Customer;
}
