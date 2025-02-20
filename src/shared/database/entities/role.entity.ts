import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "roles" })
export class RoleEntity {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_roles" })
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: false })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;

    @OneToOne(() => UserEntity, user => user.role)
    user: UserEntity[];
}