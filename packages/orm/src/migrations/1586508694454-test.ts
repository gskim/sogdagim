import {MigrationInterface, QueryRunner} from "typeorm";

export class test1586508694454 implements MigrationInterface {
    name = 'test1586508694454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `device` (`id` int NOT NULL AUTO_INCREMENT, `is_device` tinyint NOT NULL, `brand` varchar(20) NULL, `manufacturer` varchar(20) NULL, `model_name` varchar(20) NULL, `model_id` varchar(20) NULL, `design_name` varchar(20) NULL, `product_name` varchar(20) NULL, `device_year_class` varchar(20) NULL, `supported_cpu_architectures` varchar(50) NULL, `os_name` varchar(20) NOT NULL, `os_version` varchar(20) NOT NULL, `os_build_id` varchar(20) NULL, `os_internal_build_id` varchar(20) NULL, `os_build_fingerprint` varchar(300) NULL, `platform_api_level` int NULL, `device_name` varchar(100) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `image` (`id` int NOT NULL AUTO_INCREMENT, `original_name` text NOT NULL, `name` text NOT NULL, `ext` varchar(10) NOT NULL, `size` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `post_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_mapping` (`id` int NOT NULL AUTO_INCREMENT, `parent_id` int NULL, `child_id` int NULL, UNIQUE INDEX `parent_child` (`parent_id`, `child_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `unlike` (`id` int NOT NULL AUTO_INCREMENT, `status` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, `post_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(30) NULL, `text` text NOT NULL, `status` enum ('public', 'private', 'delete') NOT NULL DEFAULT 'public', `order_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, `parent_id` int NULL, UNIQUE INDEX `IDX_47251cc7a6cd6dfb78adad1871` (`order_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `status` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, `post_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `nickname` varchar(30) NULL, `email` text NULL, `verified` tinyint NOT NULL DEFAULT 0, `gender` enum ('m', 'w') NULL, `birth_year` int NULL, `birth_month` int NULL, `birth_day` int NULL, `password` text NULL, `profile_photo` text NULL, `lat` float(12) NOT NULL DEFAULT 0, `lon` float(12) NOT NULL DEFAULT 0, `sns_id` int NULL, `sns_type` varchar(10) NULL, `point` int NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `message` (`id` int NOT NULL AUTO_INCREMENT, `text` text NOT NULL, `is_image` tinyint NOT NULL DEFAULT 0, `is_read` tinyint NOT NULL DEFAULT 0, `send_success` tinyint NOT NULL DEFAULT 0, `order_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `chat_id` int NULL, `user_id` int NULL, UNIQUE INDEX `IDX_a249d6abd5b2dacca134cfea12` (`order_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `description` varchar(255) NULL, `max_persons` int NOT NULL DEFAULT 2, `password` varchar(255) NULL, `type` enum ('public', 'private', 'random', 'close') NOT NULL DEFAULT 'random', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `message_order_sequence` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `notification` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, `type` enum ('like', 'unlike', 'reply', 'invite', 'accept', 'leave', 'expire', 'extend') NOT NULL, `target_id` int NOT NULL, `is_read` tinyint NOT NULL DEFAULT 0, `order_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `send_user_id` int NULL, `receive_user_id` int NULL, UNIQUE INDEX `IDX_3ea5cd8a1de9cbf90c86dd0582` (`order_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `notification_order_sequence` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_order_sequence` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `verification` (`id` int NOT NULL AUTO_INCREMENT, `key` text NOT NULL, `verified` tinyint NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `REL_49cf5e171603b309b419485046` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_followers_user` (`user_id_1` int NOT NULL, `user_id_2` int NOT NULL, INDEX `IDX_bf1d134414d575c322caa8c15a` (`user_id_1`), INDEX `IDX_828cbfe05691311a43407ed84b` (`user_id_2`), PRIMARY KEY (`user_id_1`, `user_id_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat_users_user` (`chat_id` int NOT NULL, `user_id` int NOT NULL, INDEX `IDX_47bbc2c574f985aa11fa495336` (`chat_id`), INDEX `IDX_6f1fe66a3a27484ce383b25c15` (`user_id`), PRIMARY KEY (`chat_id`, `user_id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `device` ADD CONSTRAINT `FK_ae7154510495c7ddda951b07a07` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD CONSTRAINT `FK_595c60d3e7e8edf1cc0912782bd` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_mapping` ADD CONSTRAINT `FK_a46b3dbfa3cf3983493f3037dab` FOREIGN KEY (`parent_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_mapping` ADD CONSTRAINT `FK_5975d44135a0ba89dd74cab6bb7` FOREIGN KEY (`child_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `unlike` ADD CONSTRAINT `FK_e35a232d5fd9aa961a084581564` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `unlike` ADD CONSTRAINT `FK_0405d41f6f9bb5b8d69602e6fd5` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_52378a74ae3724bcab44036645b` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_502b5d7b881d2474c56195acb83` FOREIGN KEY (`parent_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_4356ac2f9519c7404a2869f1691` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_d41caa70371e578e2a4791a88ae` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_859ffc7f95098efb4d84d50c632` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_54ce30caeb3f33d68398ea10376` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `notification` ADD CONSTRAINT `FK_3943096480eaf789bf76674657b` FOREIGN KEY (`send_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `notification` ADD CONSTRAINT `FK_c96fc5f872aa474f2e454cddc29` FOREIGN KEY (`receive_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `verification` ADD CONSTRAINT `FK_49cf5e171603b309b4194850461` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_followers_user` ADD CONSTRAINT `FK_bf1d134414d575c322caa8c15ad` FOREIGN KEY (`user_id_1`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_followers_user` ADD CONSTRAINT `FK_828cbfe05691311a43407ed84b0` FOREIGN KEY (`user_id_2`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_users_user` ADD CONSTRAINT `FK_47bbc2c574f985aa11fa495336f` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_users_user` ADD CONSTRAINT `FK_6f1fe66a3a27484ce383b25c15c` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `chat_users_user` DROP FOREIGN KEY `FK_6f1fe66a3a27484ce383b25c15c`", undefined);
        await queryRunner.query("ALTER TABLE `chat_users_user` DROP FOREIGN KEY `FK_47bbc2c574f985aa11fa495336f`", undefined);
        await queryRunner.query("ALTER TABLE `user_followers_user` DROP FOREIGN KEY `FK_828cbfe05691311a43407ed84b0`", undefined);
        await queryRunner.query("ALTER TABLE `user_followers_user` DROP FOREIGN KEY `FK_bf1d134414d575c322caa8c15ad`", undefined);
        await queryRunner.query("ALTER TABLE `verification` DROP FOREIGN KEY `FK_49cf5e171603b309b4194850461`", undefined);
        await queryRunner.query("ALTER TABLE `notification` DROP FOREIGN KEY `FK_c96fc5f872aa474f2e454cddc29`", undefined);
        await queryRunner.query("ALTER TABLE `notification` DROP FOREIGN KEY `FK_3943096480eaf789bf76674657b`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_54ce30caeb3f33d68398ea10376`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_859ffc7f95098efb4d84d50c632`", undefined);
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_d41caa70371e578e2a4791a88ae`", undefined);
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_4356ac2f9519c7404a2869f1691`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_502b5d7b881d2474c56195acb83`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_52378a74ae3724bcab44036645b`", undefined);
        await queryRunner.query("ALTER TABLE `unlike` DROP FOREIGN KEY `FK_0405d41f6f9bb5b8d69602e6fd5`", undefined);
        await queryRunner.query("ALTER TABLE `unlike` DROP FOREIGN KEY `FK_e35a232d5fd9aa961a084581564`", undefined);
        await queryRunner.query("ALTER TABLE `post_mapping` DROP FOREIGN KEY `FK_5975d44135a0ba89dd74cab6bb7`", undefined);
        await queryRunner.query("ALTER TABLE `post_mapping` DROP FOREIGN KEY `FK_a46b3dbfa3cf3983493f3037dab`", undefined);
        await queryRunner.query("ALTER TABLE `image` DROP FOREIGN KEY `FK_595c60d3e7e8edf1cc0912782bd`", undefined);
        await queryRunner.query("ALTER TABLE `device` DROP FOREIGN KEY `FK_ae7154510495c7ddda951b07a07`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6f1fe66a3a27484ce383b25c15` ON `chat_users_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_47bbc2c574f985aa11fa495336` ON `chat_users_user`", undefined);
        await queryRunner.query("DROP TABLE `chat_users_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_828cbfe05691311a43407ed84b` ON `user_followers_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_bf1d134414d575c322caa8c15a` ON `user_followers_user`", undefined);
        await queryRunner.query("DROP TABLE `user_followers_user`", undefined);
        await queryRunner.query("DROP INDEX `REL_49cf5e171603b309b419485046` ON `verification`", undefined);
        await queryRunner.query("DROP TABLE `verification`", undefined);
        await queryRunner.query("DROP TABLE `post_order_sequence`", undefined);
        await queryRunner.query("DROP TABLE `notification_order_sequence`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3ea5cd8a1de9cbf90c86dd0582` ON `notification`", undefined);
        await queryRunner.query("DROP TABLE `notification`", undefined);
        await queryRunner.query("DROP TABLE `message_order_sequence`", undefined);
        await queryRunner.query("DROP TABLE `chat`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a249d6abd5b2dacca134cfea12` ON `message`", undefined);
        await queryRunner.query("DROP TABLE `message`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `like`", undefined);
        await queryRunner.query("DROP INDEX `IDX_47251cc7a6cd6dfb78adad1871` ON `post`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
        await queryRunner.query("DROP TABLE `unlike`", undefined);
        await queryRunner.query("DROP INDEX `parent_child` ON `post_mapping`", undefined);
        await queryRunner.query("DROP TABLE `post_mapping`", undefined);
        await queryRunner.query("DROP TABLE `image`", undefined);
        await queryRunner.query("DROP TABLE `device`", undefined);
    }

}
