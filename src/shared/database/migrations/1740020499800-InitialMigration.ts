import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740020499800 implements MigrationInterface {
    name = "InitialMigration1740020499800"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"recomendations\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"comment\" text, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE, \"deleted_at\" TIMESTAMP WITH TIME ZONE, \"user_id\" text, \"place_id\" uuid, CONSTRAINT \"PK_recomendations\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"reviews\" (\"id\" SERIAL NOT NULL, \"comment\" text, \"rating\" integer, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE NOT NULL, \"deleted_at\" TIMESTAMP WITH TIME ZONE, \"user_id\" text, \"place_id\" uuid, \"itinerary_id\" uuid, CONSTRAINT \"PK_231ae565c273ee700b283f15c1d\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"places\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" text NOT NULL, \"description\" text, \"categories\" text array, \"address\" text, \"city\" text, \"state\" text NOT NULL, \"country\" text NOT NULL, \"location\" geometry, \"website\" text, \"tags\" text array, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE, \"deleted_at\" TIMESTAMP WITH TIME ZONE, \"user_id\" text, CONSTRAINT \"PK_places\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TYPE \"public\".\"itineraries_places_status_enum\" AS ENUM('ACTIVE', 'COMPLETED', 'CANCELED')");
        await queryRunner.query("CREATE TABLE \"itineraries_places\" (\"id\" uuid NOT NULL, \"visit_order\" integer, \"visit_time\" TIME NOT NULL, \"status\" \"public\".\"itineraries_places_status_enum\" NOT NULL DEFAULT 'ACTIVE', \"duration\" TIME, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE, \"itinerary_id\" uuid, \"place_id\" uuid, CONSTRAINT \"PK_itineraries_places\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"users_itineraries\" (\"id\" uuid NOT NULL, \"is_owner\" boolean, \"user_id\" text, \"itinerary_id\" uuid, CONSTRAINT \"PK_users_itineraries\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"itineraries\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"description\" character varying, \"is_public\" boolean NOT NULL, \"tags\" text array, \"picture_url\" text array, \"start_date\" TIMESTAMP WITH TIME ZONE, \"end_date\" TIMESTAMP WITH TIME ZONE, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE, \"deleted_at\" TIMESTAMP WITH TIME ZONE, CONSTRAINT \"PK_itineraries\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"likes\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE, \"deleted_at\" TIMESTAMP WITH TIME ZONE, \"user\" text, \"itinerary\" uuid, \"place\" uuid, CONSTRAINT \"PK_likes\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"roles\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"description\" character varying, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE NOT NULL, \"deleted_at\" TIMESTAMP WITH TIME ZONE, CONSTRAINT \"PK_roles\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"users\" (\"email\" text NOT NULL, \"name\" text NOT NULL, \"firstName\" text NOT NULL, \"lastName\" text NOT NULL, \"password\" text NOT NULL, \"phone\" text, \"username\" text NOT NULL, \"picture_url\" text, \"last_login\" TIMESTAMP WITH TIME ZONE NOT NULL, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP WITH TIME ZONE NOT NULL, \"deleted_at\" TIMESTAMP WITH TIME ZONE NOT NULL, \"role\" uuid, CONSTRAINT \"PK_users\" PRIMARY KEY (\"email\"))");
        await queryRunner.query("ALTER TABLE \"recomendations\" ADD CONSTRAINT \"FK_recomendations_user_id\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"email\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"recomendations\" ADD CONSTRAINT \"FK_recomendations_place_id\" FOREIGN KEY (\"place_id\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"reviews\" ADD CONSTRAINT \"FK_reviews_user_id\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"email\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"reviews\" ADD CONSTRAINT \"FK_reviews_place_id\" FOREIGN KEY (\"place_id\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"reviews\" ADD CONSTRAINT \"FK_reviews_itinerary_id\" FOREIGN KEY (\"itinerary_id\") REFERENCES \"itineraries\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"places\" ADD CONSTRAINT \"FK_places_users\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"email\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"itineraries_places\" ADD CONSTRAINT \"FK_itineraries_places_itinerary_id\" FOREIGN KEY (\"itinerary_id\") REFERENCES \"itineraries\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"itineraries_places\" ADD CONSTRAINT \"FK_itineraries_places_place_id\" FOREIGN KEY (\"place_id\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"users_itineraries\" ADD CONSTRAINT \"FK_users_itineraries\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"email\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"users_itineraries\" ADD CONSTRAINT \"FK_itineraries_users\" FOREIGN KEY (\"itinerary_id\") REFERENCES \"itineraries\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"likes\" ADD CONSTRAINT \"FK_likes_users\" FOREIGN KEY (\"user\") REFERENCES \"users\"(\"email\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"likes\" ADD CONSTRAINT \"FK_likes_itineraries\" FOREIGN KEY (\"itinerary\") REFERENCES \"itineraries\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"likes\" ADD CONSTRAINT \"FK_likes_places\" FOREIGN KEY (\"place\") REFERENCES \"places\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"users\" ADD CONSTRAINT \"FK_users_roles\" FOREIGN KEY (\"role\") REFERENCES \"roles\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"users\" DROP CONSTRAINT \"FK_users_roles\"");
        await queryRunner.query("ALTER TABLE \"likes\" DROP CONSTRAINT \"FK_likes_places\"");
        await queryRunner.query("ALTER TABLE \"likes\" DROP CONSTRAINT \"FK_likes_itineraries\"");
        await queryRunner.query("ALTER TABLE \"likes\" DROP CONSTRAINT \"FK_likes_users\"");
        await queryRunner.query("ALTER TABLE \"users_itineraries\" DROP CONSTRAINT \"FK_itineraries_users\"");
        await queryRunner.query("ALTER TABLE \"users_itineraries\" DROP CONSTRAINT \"FK_users_itineraries\"");
        await queryRunner.query("ALTER TABLE \"itineraries_places\" DROP CONSTRAINT \"FK_itineraries_places_place_id\"");
        await queryRunner.query("ALTER TABLE \"itineraries_places\" DROP CONSTRAINT \"FK_itineraries_places_itinerary_id\"");
        await queryRunner.query("ALTER TABLE \"places\" DROP CONSTRAINT \"FK_places_users\"");
        await queryRunner.query("ALTER TABLE \"reviews\" DROP CONSTRAINT \"FK_reviews_itinerary_id\"");
        await queryRunner.query("ALTER TABLE \"reviews\" DROP CONSTRAINT \"FK_reviews_place_id\"");
        await queryRunner.query("ALTER TABLE \"reviews\" DROP CONSTRAINT \"FK_reviews_user_id\"");
        await queryRunner.query("ALTER TABLE \"recomendations\" DROP CONSTRAINT \"FK_recomendations_place_id\"");
        await queryRunner.query("ALTER TABLE \"recomendations\" DROP CONSTRAINT \"FK_recomendations_user_id\"");
        await queryRunner.query("DROP TABLE \"users\"");
        await queryRunner.query("DROP TABLE \"roles\"");
        await queryRunner.query("DROP TABLE \"likes\"");
        await queryRunner.query("DROP TABLE \"itineraries\"");
        await queryRunner.query("DROP TABLE \"users_itineraries\"");
        await queryRunner.query("DROP TABLE \"itineraries_places\"");
        await queryRunner.query("DROP TYPE \"public\".\"itineraries_places_status_enum\"");
        await queryRunner.query("DROP TABLE \"places\"");
        await queryRunner.query("DROP TABLE \"reviews\"");
        await queryRunner.query("DROP TABLE \"recomendations\"");
    }

}
