import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Order, (order) => order.Shipment_shipment_id )
    orders: Order[]

}
