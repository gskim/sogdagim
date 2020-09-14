import {MigrationInterface, QueryRunner} from "typeorm";

export class image1600044556838 implements MigrationInterface {
    name = 'image1600044556838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `name`", undefined);
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `ext`", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD `key` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD `mimetype` varchar(10) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `image` CHANGE `original_name` `original_name` text NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `image` CHANGE `original_name` `original_name` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `mimetype`", undefined);
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `key`", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD `ext` varchar(10) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD `name` text NOT NULL", undefined);
    }

}
