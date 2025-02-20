import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ItineraryEntity } from "./itinerary.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "users_itineraries" })
export class UserItineraryEntity {
    @PrimaryColumn("uuid", { primaryKeyConstraintName: "PK_users_itineraries" })
    id: string;

    @ManyToOne(() => UserEntity, user => user.itineraries, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "email",
        foreignKeyConstraintName: "FK_users_itineraries",
    })
    user: UserEntity;

    @ManyToOne(() => ItineraryEntity, itinerary => itinerary.users, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "itinerary_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_itineraries_users",
    })
    itinerary: ItineraryEntity;

    @Column("boolean", { nullable: true })
    is_owner: boolean;
}
