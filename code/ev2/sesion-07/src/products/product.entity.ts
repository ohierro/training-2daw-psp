// src/products/product.entity.ts
// Demuestra diferentes tipos de columnas con @Column
// y la relación @ManyToOne (muchos productos → un usuario owner).

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()                                           // VARCHAR
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })    // DECIMAL(10,2)
  precio: number;

  @Column({ type: 'int', default: 0 })               // INTEGER con default
  stock: number;

  @Column({ nullable: true })                         // columna opcional
  descripcion: string;

  @Column({ default: true })                          // BOOLEAN
  activo: boolean;

  @CreateDateColumn()
  creadoEn: Date;

  @ManyToOne(() => User, user => user.products, { nullable: true, onDelete: 'SET NULL' })
  owner: User;   // muchos productos pueden pertenecer a un usuario
}
