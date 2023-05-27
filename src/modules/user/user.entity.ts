import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('User')
export class User  {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("varchar", { length: 200 },)
    public firstName: string;

    @Column("varchar", { length: 200 },)
    public lastName: string;

    @Column("varchar", { length: 13 },)
    public idNumber: string;

    //TODO include email validation.
    @Column("varchar", { length: 200 },)
    public email: string;

    @Column("varchar", { length: 200 },)
    public password: string;

    @Column({ type: 'timestamptz'})
    public birthday: Date;

    //TODO we need to make this a role array one to many.
    @Column("varchar", { length: 200 },)
    public role: string;

    //TODO we need to make this a subscription.
    @Column("varchar", { length: 200 },)
    public subscription: string;
}
