import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";


@Entity('User')
export class User  {

    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;  @Column({
        type: 'varchar',
        nullable: false
    })
    @Column({
        type: 'varchar',
        nullable: true
    })
    public emailAddress: string;

    @Column("varchar", { length: 200 },)
    public firstName: string;

    @Column("varchar", { length: 200 },)
    public lastName: string;

    @Column("varchar", { length: 13 },)
    public idNumber: string;

    email: string;
    @BeforeInsert()  async hashPassword() {
        const bcrypt = require('bcrypt');
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ type: 'timestamptz'})
    public birthday: Date;

    //TODO we need to make this a role array one to many.
    @Column("varchar", { length: 200 },)
    public role: string;

    //TODO we need to make this a subscription.
    @Column("varchar", { length: 200 },)
    public subscription: string;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;
}


