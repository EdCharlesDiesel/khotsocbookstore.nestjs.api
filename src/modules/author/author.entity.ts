import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('author')
export class Author {
    @PrimaryGeneratedColumn("uuid")    public id: string;
    @Column()    public firstName: string;
    @Column() public lastName: string;


}
