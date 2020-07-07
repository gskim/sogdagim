import {MigrationInterface, QueryRunner} from "typeorm";

export class device1594103557080 implements MigrationInterface {
    name = 'device1594103557080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `device` ADD `fcm_token` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `device` ADD `uuid` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `device` ADD UNIQUE INDEX `IDX_0683d0c6ce6c0327208a026da5` (`uuid`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `uuid` ON `device` (`uuid`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `uuid` ON `device`", undefined);
        await queryRunner.query("ALTER TABLE `device` DROP INDEX `IDX_0683d0c6ce6c0327208a026da5`", undefined);
        await queryRunner.query("ALTER TABLE `device` DROP COLUMN `uuid`", undefined);
        await queryRunner.query("ALTER TABLE `device` DROP COLUMN `fcm_token`", undefined);
    }

}
