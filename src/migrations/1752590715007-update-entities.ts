import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1752590715007 implements MigrationInterface {
    name = 'UpdateEntities1752590715007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_353f6f2e67272f75e2ea2f83086"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "ingredients" uuid array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "from_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "to_date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "ingredients"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "recipe_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_353f6f2e67272f75e2ea2f83086" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
