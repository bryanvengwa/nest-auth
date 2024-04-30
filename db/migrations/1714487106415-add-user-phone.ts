import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1714487106415 implements MigrationInterface {
    name = 'AddUserPhone1714487106415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
