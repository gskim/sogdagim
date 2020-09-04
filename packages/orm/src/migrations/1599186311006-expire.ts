import {MigrationInterface, QueryRunner} from "typeorm";

export class expire1599186311006 implements MigrationInterface {
    name = 'expire1599186311006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat` ADD `expiration_date` datetime NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat` DROP COLUMN `expiration_date`", undefined);
    }

}
