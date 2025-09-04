import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigrations1756975077100 implements MigrationInterface {
    name = 'UserMigrations1756975077100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" uuid NOT NULL, "ingredientId" uuid NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`CREATE TABLE "meal_recipes_recipe" ("mealId" uuid NOT NULL, "recipeId" uuid NOT NULL, CONSTRAINT "PK_bd7addd752eb1327a08e76c13c6" PRIMARY KEY ("mealId", "recipeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a284b69ecf191a62f1ca7a65d3" ON "meal_recipes_recipe" ("mealId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9f08011a5c493b10dd62a73b0" ON "meal_recipes_recipe" ("recipeId") `);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meal_recipes_recipe" ADD CONSTRAINT "FK_a284b69ecf191a62f1ca7a65d3c" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meal_recipes_recipe" ADD CONSTRAINT "FK_e9f08011a5c493b10dd62a73b09" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_recipes_recipe" DROP CONSTRAINT "FK_e9f08011a5c493b10dd62a73b09"`);
        await queryRunner.query(`ALTER TABLE "meal_recipes_recipe" DROP CONSTRAINT "FK_a284b69ecf191a62f1ca7a65d3c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9f08011a5c493b10dd62a73b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a284b69ecf191a62f1ca7a65d3"`);
        await queryRunner.query(`DROP TABLE "meal_recipes_recipe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
    }

}
