import {MigrationInterface, QueryRunner} from "typeorm";

export class point1599988276843 implements MigrationInterface {
    name = 'point1599988276843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `point` `point` int NOT NULL DEFAULT 50", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `point` `point` int NOT NULL DEFAULT '0'", undefined);
    }

}
