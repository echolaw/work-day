import { Entity, ObjectIdColumn, ObjectID, Column, BeforeUpdate, BeforeInsert } from 'typeorm';

@Entity()
export abstract class Base {
  @ObjectIdColumn() public id: ObjectID;
  @Column() public createdAt: Date;
  @Column() public updatedAt: Date;

  @BeforeInsert()
  public createdDates() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  public updateDates() {
    this.updatedAt = new Date();
  }
}
