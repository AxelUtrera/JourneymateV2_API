import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "visit_expenses" })
export class VisitExpenseEntity {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "PK_visit_expenses" })
    id: number;

    @ManyToOne(() => UserEntity, user => user.visit_expenses)
    user: UserEntity;

    @ManyToOne(() => PlaceEntity, place => place.visit_expenses)
    place: PlaceEntity;

    @Column("money", { nullable: false })
    amount: number;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;
}