import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSchema1758904828468 implements MigrationInterface {
    name = 'AddSchema1758904828468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_3111c7cf13da976d7ed18287811"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_expires_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_67d98fd6ff56c4340a811402154" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_d89009b328c39e42964f8b3f95b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_dacc0e78fd6dcaf1f3b1ee043ca" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "FK_fca8d5fa6880bc679dc79ece0f8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "FK_fca8d5fa6880bc679dc79ece0f8"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_dacc0e78fd6dcaf1f3b1ee043ca"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_d89009b328c39e42964f8b3f95b"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_67d98fd6ff56c4340a811402154"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_317acbdff49aeb8558a1bc6c606"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "grocery" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_expires_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD "to_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meals" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipe-ingredients" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetExpiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetToken" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_3111c7cf13da976d7ed18287811" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9a8a13cc60b4a4a067679cde290" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
