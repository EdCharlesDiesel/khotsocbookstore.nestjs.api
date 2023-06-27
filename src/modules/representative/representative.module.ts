import { Module } from '@nestjs/common';
import { RepresentativeController } from './representative.controller';
import { RepresentativeService } from './representative.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Representative } from "./representative.entity";


@Module({
  imports: [ TypeOrmModule.forFeature([Representative])],
  controllers: [RepresentativeController],
  providers: [RepresentativeService],
  exports: [RepresentativeService],
})
export class RepresentativeModule {}
