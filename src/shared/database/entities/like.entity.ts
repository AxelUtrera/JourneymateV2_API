import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryEntity } from "./itinerary.entity";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "likes" })
export class LikeEntity {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_likes" })
    id: string;

    @ManyToOne(() => UserEntity, userEntity => userEntity.likes, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "user",
        referencedColumnName: "email",
        foreignKeyConstraintName: "FK_likes_users",
    })
    user: UserEntity;

    @ManyToOne(() => ItineraryEntity, itineraryEntity => itineraryEntity.likes, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "itinerary",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_likes_itineraries",
    })
    itinerary: ItineraryEntity;

    @ManyToOne(() => PlaceEntity, placeEntity => placeEntity.likes, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "place",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_likes_places",
    })
    place: PlaceEntity;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: true })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;
}