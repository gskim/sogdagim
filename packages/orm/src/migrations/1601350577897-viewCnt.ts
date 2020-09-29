import {MigrationInterface, QueryRunner} from "typeorm";

export class viewCnt1601350577897 implements MigrationInterface {
    name = 'viewCnt1601350577897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `post_view_count` (`id` int NOT NULL AUTO_INCREMENT, `cnt` int NOT NULL DEFAULT 0, `post_id` int NULL, UNIQUE INDEX `REL_5e5a14de7d9650cfeae3f231c6` (`post_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post_view_count` ADD CONSTRAINT `FK_5e5a14de7d9650cfeae3f231c61` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_view_count` DROP FOREIGN KEY `FK_5e5a14de7d9650cfeae3f231c61`", undefined);
        await queryRunner.query("DROP INDEX `REL_5e5a14de7d9650cfeae3f231c6` ON `post_view_count`", undefined);
        await queryRunner.query("DROP TABLE `post_view_count`", undefined);
    }

}
