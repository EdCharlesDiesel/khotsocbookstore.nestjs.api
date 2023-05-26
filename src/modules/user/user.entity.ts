import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
import { string } from "@hapi/joi";


@Entity('User')
export class User  {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column(type => string)
    public firstName: string;

    @Column(type => string)
    public lastName: string;

    @Column(type => string)
    public idNumber: string;

    @Column(type => string)
    public email: string;

    @Column(type => string)
    public password: string;

    @Column(type => Date)
    public birthday: Date;

    //TODO we need to make this a role array one to many.
    @Column(type => string)
    public role: string;

    //TODO we need to make this a subscription.
    @Column(type => string)
    public subscription: string;






}
