import {MigrationInterface, QueryRunner} from "typeorm";

export class socketId1599124133704 implements MigrationInterface {
    name = 'socketId1599124133704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat_queue` CHANGE `data` `socket_id` json NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_queue` DROP COLUMN `socket_id`", undefined);
        await queryRunner.query("ALTER TABLE `chat_queue` ADD `socket_id` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat_queue` DROP COLUMN `socket_id`", undefined);
        await queryRunner.query("ALTER TABLE `chat_queue` ADD `socket_id` json NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_queue` CHANGE `socket_id` `data` json NOT NULL", undefined);
    }

}
