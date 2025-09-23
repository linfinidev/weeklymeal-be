import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRecipe1758639900801 implements MigrationInterface {
    name = 'UpdateRecipe1758639900801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "content" TO "intructions"`);
        await queryRunner.query(`CREATE TABLE "recipe-ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unit" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "recipe_id" uuid, "ingredient_id" uuid, CONSTRAINT "PK_7281a3d0ae420e0b3272194c8df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD CONSTRAINT "FK_181af7eaea590132079674e5a84" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD CONSTRAINT "FK_60a559de781292b29ffd1740651" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP CONSTRAINT "FK_60a559de781292b29ffd1740651"`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP CONSTRAINT "FK_181af7eaea590132079674e5a84"`);
        await queryRunner.query(`DROP TABLE "recipe-ingredients"`);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "intructions" TO "content"`);
    }

}
