import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentService } from '../../shipment.service';



describe('BookService', () => {
  let service: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  ShipmentService,
        useValue:{}
      }],
    }).compile();

    service = module.get<ShipmentService>(ShipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
