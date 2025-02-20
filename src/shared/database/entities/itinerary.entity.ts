import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryPlaceEntity } from "./itinerary-place.entity";
import { LikeEntity } from "./like.entity";
import { ReviewEntity } from "./review.entity";
import { UserItineraryEntity } from "./user-itinerary.entity";

@Entity({ name: "itineraries" })
export class ItineraryEntity {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_itineraries" })
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: false })
    is_public: boolean;

    @Column("text", { nullable: true, array: true })
    tags: string[];

    @Column("text", { nullable: true, array: true })
    picture_url: string[];

    @Column("timestamptz", { nullable: true })
    start_date: Date;

    @Column("timestamptz", { nullable: true })
    end_date: Date;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: true })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;

    @OneToMany(() => UserItineraryEntity, userItinerary => userItinerary.itinerary)
    users: UserItineraryEntity[];

    @OneToMany(() => LikeEntity, like => like.itinerary)
    likes: LikeEntity[];

    @OneToMany(() => ItineraryPlaceEntity, itineraryPlaceEntity => itineraryPlaceEntity.itinerary)
    places: ItineraryPlaceEntity[];

    @OneToMany(() => ReviewEntity, review => review.itinerary)
    reviews: ReviewEntity[];
}