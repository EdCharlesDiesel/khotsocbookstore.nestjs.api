import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";
import { Cart } from "../cart/cart.entity";
import { Wishlist } from "../wishList/wishlist.entity";

@Entity('Product')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    public product_id: string;

    @Column("varchar", { length: 200 },)
    public name: string;

    @Column("varchar", { length: 200 })
    public SKU: string;

    @Column("varchar", { length: 200 })
    public description: string;

    @Column({ type: "int", width: 200 })
    public price: number;

    @Column({ type: "int", width: 200 })
    public stock: number;

    @ManyToOne(() => Product, (shipment) => shipment.Category_category_id)
    Category_category_id: Product;

    @OneToMany(() => Cart, (cart) => cart.cart_id )
    carts: Cart[]

    @OneToMany(() => Order, (order) => order.Shipment_shipment_id )
    orders: Order[]

    @OneToMany(() => Wishlist, (wishlist) => wishlist.Product_product_id )
    wishlists: Wishlist[]
}
