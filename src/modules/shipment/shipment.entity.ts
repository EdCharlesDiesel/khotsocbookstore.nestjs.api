import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Order } from "../order/order.entity";

@Entity('Shipment')
export class Shipment {
    @PrimaryGeneratedColumn("uuid")
    public shipment_id: string;

    @Column("varchar", { length: 200 },)
    public address: string;

    @Column({ type: 'timestamptz'})
    public shipment_date: Date;

    @Column("varchar", { length: 200 })
    public city: string;

    @Column("varchar", { length: 200 })
    public province: string;

    @Column("varchar", { length: 200 })
    public country: string;

    @Column("varchar", { length: 200 })
    public postal_code: string;

    @OneToMany(() => Order, (order) => order.order_id )
    orders: Order[]
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;

}
