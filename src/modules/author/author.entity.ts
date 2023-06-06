import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";


@Entity('Author')
export class Author {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column("varchar", { length: 200 },)
    public firstName: string;
    @Column("varchar", { length: 200 },)
    public lastName: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;
}
