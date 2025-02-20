import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryPlaceEntity } from "./itinerary-place.entity";
import { ItineraryEntity } from "./itinerary.entity";
import { LikeEntity } from "./like.entity";
import { RecomendationEntity } from "./recomendation.entity";
import { ReviewEntity } from "./review.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "places" })
export class PlaceEntity {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_places" })
    id: string;

    @ManyToOne(() => UserEntity, user => user.places, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "email",
        foreignKeyConstraintName: "FK_places_users",
    })
    user: UserEntity;

    @Column("text", { nullable: false })
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("text", { nullable: true, array: true })
    categories: string[];

    @Column("text", { nullable: true })
    address: string;

    @Column("text", { nullable: true })
    city: string;

    @Column("text", { nullable: false })
    state: string;

    @Column("text", { nullable: false })
    country: string;

    @Column("geometry", { nullable: true })
    location: Point;

    @Column("text", { nullable: true })
    website: string;

    @Column("text", { nullable: true, array: true })
    tags: string[];

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: true })
    updated_at: Date;

    @Column("timestamptz", { nullable: true })
    deleted_at: Date;

    @OneToMany(() => LikeEntity, like => like.place)
    likes: LikeEntity[];

    @OneToMany(() => ItineraryPlaceEntity, itineraryPlace => itineraryPlace.itinerary)
    itineraries: ItineraryEntity[];

    @OneToMany(() => ReviewEntity, review => review.place)
    reviews: ReviewEntity[];

    @OneToMany(() => RecomendationEntity, recomendation => recomendation.place)
    recomendations: RecomendationEntity[];
}