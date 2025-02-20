import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "recomendations" })
export class RecomendationEntity {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_recomendations" })
    id: string;

    @ManyToOne(() => UserEntity, user => user.recomendations)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "email",
        foreignKeyConstraintName: "FK_recomendations_user_id",
    })
    user: UserEntity;

    @ManyToOne(() => PlaceEntity, place => place.recomendations)
    @JoinColumn({
        name: "place_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_recomendations_place_id",
    })
    place: PlaceEntity;

    @Column("text", { nullable: true })
    comment: string;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: true })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;
}