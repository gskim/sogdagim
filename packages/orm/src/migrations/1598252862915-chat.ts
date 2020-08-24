import {MigrationInterface, QueryRunner} from "typeorm";

export class chat1598252862915 implements MigrationInterface {
    name = 'chat1598252862915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_0683d0c6ce6c0327208a026da5` ON `device`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `send_success`", undefined);
        await queryRunner.query("CREATE INDEX `IDX_0683d0c6ce6c0327208a026da5` ON `device` (`uuid`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_0683d0c6ce6c0327208a026da5` ON `device`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `send_success` tinyint NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_0683d0c6ce6c0327208a026da5` ON `device` (`uuid`)", undefined);
    }

}
