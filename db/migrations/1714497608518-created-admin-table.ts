import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAdminTable1714497608518 implements MigrationInterface {
    name = 'CreatedAdminTable1714497608518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_420cf6d31487d2f341b40d52e3" UNIQUE ("userId"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963" UNIQUE ("adminId")`);
        await queryRunner.query(`ALTER TABLE "admins" ADD CONSTRAINT "FK_420cf6d31487d2f341b40d52e37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP CONSTRAINT "FK_420cf6d31487d2f341b40d52e37"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adminId"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
