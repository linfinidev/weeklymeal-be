import { MigrationInterface, QueryRunner } from "typeorm";

export class EditMealTable1756034997914 implements MigrationInterface {
    name = 'EditMealTable1756034997914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "meal" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "meal" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
