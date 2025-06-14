import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_category',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isUnique: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'date', type: 'datetime' },
          { name: 'location', type: 'varchar' },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'categoryId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['categoryId'],
            referencedTableName: 'event_category',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event');
    await queryRunner.dropTable('event_category');
  }
}

