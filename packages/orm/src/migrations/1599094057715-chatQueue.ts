import {MigrationInterface, QueryRunner} from "typeorm";

export class chatQueue1599094057715 implements MigrationInterface {
    name = 'chatQueue1599094057715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `chat_queue` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('match', 'ready', 'out') NOT NULL DEFAULT 'ready', `user_id` int NOT NULL, `data` json NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_7c2083c235503359ed874e06f0` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_7c2083c235503359ed874e06f0` ON `chat_queue`", undefined);
        await queryRunner.query("DROP TABLE `chat_queue`", undefined);
    }

}
