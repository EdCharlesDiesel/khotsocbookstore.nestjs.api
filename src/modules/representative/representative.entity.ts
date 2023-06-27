import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity('Country')
export class Country {
    @PrimaryGeneratedColumn("uuid")
    public country_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;

    @Column("varchar", { length: 200 },)
    public code?: string;
}
