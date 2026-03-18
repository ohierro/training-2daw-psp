// src/users/user.entity.ts
// Entidad User: TypeORM la mapea a la tabla 'users' en SQLite.
// Demuestra @Entity, @PrimaryGeneratedColumn, @Column con opciones,
// e @Index para búsquedas eficientes por email.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()         // INTEGER autoincremental
  id: number;

  @Column()
  nombre: string;

  @Index()                          // índice → búsquedas por email más rápidas
  @Column({ unique: true })         // constraint UNIQUE en BD
  email: string;

  @Column({ default: 'user' })      // valor por defecto
  role: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()               // TypeORM rellena automáticamente al crear
  creadoEn: Date;

  @OneToMany(() => Product, product => product.owner, { eager: false })
  products: Product[];              // un usuario puede tener varios productos
}
