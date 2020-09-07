import {MigrationInterface, QueryRunner} from "typeorm";

export class oauthId1599489868471 implements MigrationInterface {
    name = 'oauthId1599489868471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `oauth_id`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `oauth_id` bigint NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `oauth_id`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `oauth_id` int NULL", undefined);
    }

}
