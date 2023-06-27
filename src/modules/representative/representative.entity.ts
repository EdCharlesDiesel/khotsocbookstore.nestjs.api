import {
    Column,
    Entity, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Customer } from "../customer/customer.entity";


@Entity('Representative')
export class Representative {
    @PrimaryGeneratedColumn("uuid")
    public representative_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;

    @Column("varchar")
    public image?: string;

    @OneToOne(() => Customer, (representative) => representative.representative) // specify inverse side as a second parameter
    customer: Customer;
    
}
