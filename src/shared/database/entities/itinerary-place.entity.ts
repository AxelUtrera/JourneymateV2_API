import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ItineraryEntity } from "./itinerary.entity";
import { PlaceEntity } from "./place.entity";
import { Status } from "./status.enum";

@Entity({ name: "itineraries_places" })
export class ItineraryPlaceEntity {
    @PrimaryColumn("uuid", { primaryKeyConstraintName: "PK_itineraries_places" })
    id: string;

    @ManyToOne(() => ItineraryEntity, itinerary => itinerary.places)
    @JoinColumn({
        name: "itinerary_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_itineraries_places_itinerary_id",
    })
    itinerary: ItineraryEntity;


    @ManyToOne(() => PlaceEntity, place => place.itineraries)
    @JoinColumn({
        name: "place_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_itineraries_places_place_id",
    })
    place: PlaceEntity;

    @Column("int", { nullable: true })
    visit_order: number;

    @Column("time", { nullable: false })
    visit_time: Date;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.ACTIVE,
    })
    status: Status;

    @Column("time", { nullable: true })
    duration: string;

    @Column("timestamptz", { nullable: false, default: () => "now()" })
    created_at: Date;

    @Column("timestamptz", { nullable: true })
    updated_at: Date;
}