import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIngredient1752473458458 implements MigrationInterface {
    name = 'AddIngredient1752473458458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_87bc0c439d3f0e8cd2f2b37c591"`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "fridge_id"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "ingredient_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "UQ_f9695cb0fc7fc7b996fa5c37e9b" UNIQUE ("ingredient_id")`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "bought_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "expired_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "ingredient_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "UQ_bec6c95d9b48260154718b329dd" UNIQUE ("ingredient_id")`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_f9695cb0fc7fc7b996fa5c37e9b" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_bec6c95d9b48260154718b329dd" FOREIGN KEY ("ingredient_id") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_bec6c95d9b48260154718b329dd"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_f9695cb0fc7fc7b996fa5c37e9b"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "UQ_bec6c95d9b48260154718b329dd"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "ingredient_id"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "expired_date"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "bought_date"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "UQ_f9695cb0fc7fc7b996fa5c37e9b"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "ingredient_id"`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "fridge_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_87bc0c439d3f0e8cd2f2b37c591" FOREIGN KEY ("fridge_id") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
