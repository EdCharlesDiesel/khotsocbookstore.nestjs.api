import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shipment } from "./shipment.entity";
import { IShipmentService } from "./interfaces/IShipmentService";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";

@Injectable()
export class ShipmentService implements IShipmentService {
  constructor(@InjectRepository(Shipment) private readonly shipmentRepository: Repository<Shipment>) {
  }

  findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  public async findById(id: string): Promise<Shipment> {

    const shipment = await this.shipmentRepository.findOneBy({ shipment_id: id });
    if (shipment) {
      return shipment;
    }

    throw new HttpException('Shipment not found', HttpStatus.NOT_FOUND);
  }

  public async create(shipment: CreateShipmentDto): Promise<Shipment> {
    const shipmentToAdd = await this.shipmentRepository.create(shipment);
    await this.shipmentRepository.save(shipmentToAdd);

    return shipmentToAdd;
  }

  public async update(id: string, newShipment: UpdateShippingDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findBy({ shipment_id:id });
    if (!shipment) {
      throw new Error("The shipment was not found.");
    } else {
      await this.shipmentRepository.update(id, newShipment);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.shipmentRepository.delete(id);
  }

}

