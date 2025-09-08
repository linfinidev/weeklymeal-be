import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0908041757334599342 implements MigrationInterface {
    name = 'Migration0908041757334599342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying(255) NOT NULL, "resetToken" character varying(255), "resetExpiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "content" text NOT NULL, "img_url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grocery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qty" character varying NOT NULL, "from_date" character varying NOT NULL, "to_date" character varying NOT NULL, "ingredient_id" uuid NOT NULL, CONSTRAINT "REL_f9695cb0fc7fc7b996fa5c37e9" UNIQUE ("ingredient_id"), CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fridge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qty" character varying NOT NULL, "bought_date" character varying NOT NULL, "expired_date" character varying NOT NULL, "ingredient_id" uuid NOT NULL, CONSTRAINT "REL_bec6c95d9b48260154718b329d" UNIQUE ("ingredient_id"), CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients" ("recipe_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, CONSTRAINT "PK_90484480b3b2978068565ae2a2f" PRIMARY KEY ("recipe_id", "ingredient_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f240137e0e13bed80bdf64fed5" ON "recipe_ingredients" ("recipe_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_133545365243061dc2c55dc137" ON "recipe_ingredients" ("ingredient_id") `);
        await queryRunner.query(`CREATE TABLE "meal_recipes" ("meal_id" uuid NOT NULL, "recipe_id" uuid NOT NULL, CONSTRAINT "PK_d2a4eaae9dde1b37026d0e99687" PRIMARY KEY ("meal_id", "recipe_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18a86b4e4f568b6a9fa2ac3f48" ON "meal_recipes" ("meal_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_85b1ddd8428c94fa31acf6b9ec" ON "meal_recipes" ("recipe_id") `);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_67d98fd6ff56c4340a811402154" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_d89009b328c39e42964f8b3f95b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_f9695cb0fc7fc7b996fa5c37e9b" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_bec6c95d9b48260154718b329dd" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_133545365243061dc2c55dc1373" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" ADD CONSTRAINT "FK_18a86b4e4f568b6a9fa2ac3f482" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" ADD CONSTRAINT "FK_85b1ddd8428c94fa31acf6b9ecc" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_recipes" DROP CONSTRAINT "FK_85b1ddd8428c94fa31acf6b9ecc"`);
        await queryRunner.query(`ALTER TABLE "meal_recipes" DROP CONSTRAINT "FK_18a86b4e4f568b6a9fa2ac3f482"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_133545365243061dc2c55dc1373"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_bec6c95d9b48260154718b329dd"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_f9695cb0fc7fc7b996fa5c37e9b"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_d89009b328c39e42964f8b3f95b"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_67d98fd6ff56c4340a811402154"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85b1ddd8428c94fa31acf6b9ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18a86b4e4f568b6a9fa2ac3f48"`);
        await queryRunner.query(`DROP TABLE "meal_recipes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_133545365243061dc2c55dc137"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f240137e0e13bed80bdf64fed5"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients"`);
        await queryRunner.query(`DROP TABLE "fridge"`);
        await queryRunner.query(`DROP TABLE "grocery"`);
        await queryRunner.query(`DROP TABLE "meals"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
