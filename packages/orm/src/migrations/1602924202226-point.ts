import {MigrationInterface, QueryRunner} from "typeorm";

export class point1602924202226 implements MigrationInterface {
    name = 'point1602924202226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `point` (`id` int NOT NULL AUTO_INCREMENT, `point` int NOT NULL, `type` enum ('in', 'out') NOT NULL, `order_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `IDX_e5634574297a10a60877457c3c` (`order_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `point_order_sequence` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `point` ADD CONSTRAINT `FK_9399c30a2304f6948938f84b06d` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `point` DROP FOREIGN KEY `FK_9399c30a2304f6948938f84b06d`", undefined);
        await queryRunner.query("DROP TABLE `point_order_sequence`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e5634574297a10a60877457c3c` ON `point`", undefined);
        await queryRunner.query("DROP TABLE `point`", undefined);
    }

}
