import {MigrationInterface, QueryRunner} from "typeorm";

export class replycnt1601358268988 implements MigrationInterface {
    name = 'replycnt1601358268988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `reply_count` (`id` int NOT NULL AUTO_INCREMENT, `like_cnt` int NOT NULL DEFAULT 0, `reply_cnt` int NOT NULL DEFAULT 0, `reply_id` int NULL, UNIQUE INDEX `REL_908c0f5b355c4bc3977bd8dde3` (`reply_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `reply_count` ADD CONSTRAINT `FK_908c0f5b355c4bc3977bd8dde31` FOREIGN KEY (`reply_id`) REFERENCES `reply`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `reply_count` DROP FOREIGN KEY `FK_908c0f5b355c4bc3977bd8dde31`", undefined);
        await queryRunner.query("DROP INDEX `REL_908c0f5b355c4bc3977bd8dde3` ON `reply_count`", undefined);
        await queryRunner.query("DROP TABLE `reply_count`", undefined);
    }

}
