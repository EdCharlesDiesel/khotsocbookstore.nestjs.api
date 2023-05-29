
import { CreateShipmentDto } from "../dto/create-shipment.dto";
import { UpdateShippingDto } from "../dto/update-shipping.dto";
import { Shipment } from "../shipment.entity";


export interface IShipmentService {
    findAll(): Promise<Array<Shipment>>;
    findById(id: string): Promise<Shipment | null>;
    create(book: CreateShipmentDto): Promise<Shipment>;
    update(id: string, newPayment: UpdateShippingDto): Promise<Shipment| null>;
    delete(id: string): Promise<void>;
}
