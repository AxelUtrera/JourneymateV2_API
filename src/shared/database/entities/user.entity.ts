import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { LikeEntity } from "./like.entity";
import { PlaceEntity } from "./place.entity";
import { RecomendationEntity } from "./recomendation.entity";
import { ReviewEntity } from "./review.entity";
import { RoleEntity } from "./role.entity";
import { UserItineraryEntity } from "./user-itinerary.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn("text", { unique: true, nullable: false, primaryKeyConstraintName: "PK_users" })
  email: string;

  @ManyToOne(() => RoleEntity, role => role.user)
  @JoinColumn({
    name: "role",
    referencedColumnName: "id",
    foreignKeyConstraintName: "FK_users_roles",
  })
  role: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: false })
  firstName: string;

  @Column("text", { nullable: false })
  lastName: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("text", { nullable: true })
  phone: string;

  @Column("text", { nullable: false })
  username: string;

  @Column("text", { nullable: true })
  picture_url: string;

  @Column("timestamptz", { nullable: false })
  last_login: Date;

  @Column("timestamptz", { nullable: false, default: () => "now()" })
  created_at: Date;

  @Column("timestamptz", { nullable: false })
  updated_at: Date;

  @Column("timestamptz", { nullable: false })
  deleted_at: Date;

  @OneToMany(() => PlaceEntity, place => place.user)
  places: PlaceEntity[];

  @OneToMany(() => UserItineraryEntity, userItinerary => userItinerary.user)
  itineraries: UserItineraryEntity[];

  @OneToMany(() => LikeEntity, like => like.user)
  likes: LikeEntity[];

  @OneToMany(() => ReviewEntity, review => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => RecomendationEntity, recomendation => recomendation.user)
  recomendations: RecomendationEntity[];
}