import {MigrationInterface, QueryRunner} from "typeorm";

export class user1599151742389 implements MigrationInterface {
    name = 'user1599151742389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `verified`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_year` `birth_year` varchar(4) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_month` `birth_month` varchar(2) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_day` `birth_day` varchar(2) NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat` CHANGE `type` `type` enum ('public', 'private', 'friend', 'random', 'close') NOT NULL DEFAULT 'random'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat` CHANGE `type` `type` enum ('public', 'private', 'random', 'close') NOT NULL DEFAULT 'random'", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_day` `birth_day` varchar(2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_month` `birth_month` varchar(2) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `birth_year` `birth_year` varchar(4) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `verified` tinyint NOT NULL DEFAULT '0'", undefined);
    }

}
