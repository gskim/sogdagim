import {MigrationInterface, QueryRunner} from "typeorm";

export class count1601358019232 implements MigrationInterface {
    name = 'count1601358019232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `post_count` (`id` int NOT NULL AUTO_INCREMENT, `view_cnt` int NOT NULL DEFAULT 0, `like_cnt` int NOT NULL DEFAULT 0, `reply_cnt` int NOT NULL DEFAULT 0, `post_id` int NULL, UNIQUE INDEX `REL_ea1f340061b8353efb6e8c91dd` (`post_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `post_count` ADD CONSTRAINT `FK_ea1f340061b8353efb6e8c91dd5` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post_count` DROP FOREIGN KEY `FK_ea1f340061b8353efb6e8c91dd5`", undefined);
        await queryRunner.query("DROP INDEX `REL_ea1f340061b8353efb6e8c91dd` ON `post_count`", undefined);
        await queryRunner.query("DROP TABLE `post_count`", undefined);
    }

}
