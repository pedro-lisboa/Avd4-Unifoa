import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
  } from 'typeorm';

export class CreateAppointments1606824471232 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'doctor_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'pacient_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'date',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
          columnNames: ['doctor_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'doctors',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
          columnNames: ['pacient_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'pacients',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }
  }
