import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";


@Entity('User')
export class User  {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public idNumber: string;


    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public birthday: Date;

    //TODO we need to make this a role array one to many.
    @Column()
    public role: string;

    //TODO we need to make this a subscription.
    @Column()
    public subscription: string;





    // @CreatedAt public createdAt: Date;
    //
    // @UpdatedAt public updatedAt: Date;
    //
    // @DeletedAt public deletedAt: Date;

    // @HasMany(() => Entry)
    // public entries: Entry[];

    // @HasMany(() => Comment)
    // public comments: Comment[];


    public static validateData(user: User, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
    }


    // public static async hashPassword(user: User, options: any) {
    //     if (!options.transaction) throw new Error('Missing transaction.');
    //
    //     user.password = crypto
    //         .createHmac('sha256', user.password)
    //         .digest('hex');
    // }
}
