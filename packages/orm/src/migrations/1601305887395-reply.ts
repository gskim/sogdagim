import {MigrationInterface, QueryRunner} from "typeorm";

export class reply1601305887395 implements MigrationInterface {
    name = 'reply1601305887395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_502b5d7b881d2474c56195acb83`", undefined);
        await queryRunner.query("ALTER TABLE `message` CHANGE `is_read` `read_count` tinyint NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("CREATE TABLE `reply` (`id` int NOT NULL AUTO_INCREMENT, `text` text NOT NULL, `status` enum ('public', 'private', 'delete') NOT NULL DEFAULT 'public', `order_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, `post_id` int NULL, `parent_id` int NULL, UNIQUE INDEX `IDX_4621ddf4ab963ad44f04d7d9b0` (`order_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `reply_order_sequence` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `parent_id`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `read_count`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `read_count` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `reply` ADD CONSTRAINT `FK_ff320a60506a27ed687ed8e99b9` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `reply` ADD CONSTRAINT `FK_26661bdd4c8727e914b5f2b10b5` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `reply` ADD CONSTRAINT `FK_23e5fa842ebee38610a7edd8a70` FOREIGN KEY (`parent_id`) REFERENCES `reply`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `reply` DROP FOREIGN KEY `FK_23e5fa842ebee38610a7edd8a70`", undefined);
        await queryRunner.query("ALTER TABLE `reply` DROP FOREIGN KEY `FK_26661bdd4c8727e914b5f2b10b5`", undefined);
        await queryRunner.query("ALTER TABLE `reply` DROP FOREIGN KEY `FK_ff320a60506a27ed687ed8e99b9`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `read_count`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `read_count` tinyint NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `parent_id` int NULL", undefined);
        await queryRunner.query("DROP TABLE `reply_order_sequence`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4621ddf4ab963ad44f04d7d9b0` ON `reply`", undefined);
        await queryRunner.query("DROP TABLE `reply`", undefined);
        await queryRunner.query("ALTER TABLE `message` CHANGE `read_count` `is_read` tinyint NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_502b5d7b881d2474c56195acb83` FOREIGN KEY (`parent_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
