import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialData1752460004423 implements MigrationInterface {
    name = 'InitialData1752460004423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "content" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fridge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "qty" character varying NOT NULL, CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grocery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "qty" character varying NOT NULL, "date" character varying NOT NULL, "recipe_id" uuid NOT NULL, "fridge_id" uuid NOT NULL, CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "type" character varying NOT NULL, "recipe_id" uuid NOT NULL, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_353f6f2e67272f75e2ea2f83086" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_87bc0c439d3f0e8cd2f2b37c591" FOREIGN KEY ("fridge_id") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_6ce5bb54e1454704b0183c847ee" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_6ce5bb54e1454704b0183c847ee"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_87bc0c439d3f0e8cd2f2b37c591"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_353f6f2e67272f75e2ea2f83086"`);
        await queryRunner.query(`DROP TABLE "meal"`);
        await queryRunner.query(`DROP TABLE "grocery"`);
        await queryRunner.query(`DROP TABLE "fridge"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
