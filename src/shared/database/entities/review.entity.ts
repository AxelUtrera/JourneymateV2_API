import { Max, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryEntity } from "./itinerary.entity";
import { PlaceEntity } from "./place.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "reviews" })
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.reviews)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "email",
        foreignKeyConstraintName: "FK_reviews_user_id",
    })
    user: UserEntity;

    @ManyToOne(() => PlaceEntity, place => place.reviews)
    @JoinColumn({
        name: "place_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_reviews_place_id",
    })
    place: PlaceEntity;

    @ManyToOne(() => ItineraryEntity, itinerary => itinerary.reviews)
    @JoinColumn({
        name: "itinerary_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_reviews_itinerary_id",
    })
    itinerary: ItineraryEntity;

    @Column("text", { nullable: true })
    comment: string;

    @Column("integer", { nullable: true })
    @Min(0)
    @Max(5)
    rating: number;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: false })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;
}