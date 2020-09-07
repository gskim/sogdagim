import {MigrationInterface, QueryRunner} from "typeorm";

export class userSns1599483571662 implements MigrationInterface {
    name = 'userSns1599483571662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(300) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(300) NOT NULL", undefined);
    }

}
