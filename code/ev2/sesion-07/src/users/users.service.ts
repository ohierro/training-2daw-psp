// src/users/users.service.ts
// Demuestra el uso de Repository<User>:
//   - find(), findOneBy(), save(), update(), delete()
//   - búsquedas con condiciones, order, take/skip
//   - carga de relaciones con { relations }
//   - QueryBuilder para queries complejas
//   - manejo de errores de BD (UNIQUE constraint)

import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // ── Consultas básicas ─────────────────────────────────────────────────────

  findAll(role?: string): Promise<User[]> {
    if (role) {
      return this.usersRepository.find({
        where: { role },
        order: { nombre: 'ASC' },
      });
    }
    return this.usersRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  // Carga la relación products (OneToMany)
  findOneWithProducts(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  // ── QueryBuilder: usuarios activos con nombre o email coincidente ─────────
  search(query: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.activo = :activo', { activo: true })
      .andWhere('(user.nombre LIKE :q OR user.email LIKE :q)', { q: `%${query}%` })
      .orderBy('user.nombre', 'ASC')
      .getMany();
  }

  // ── Mutaciones ────────────────────────────────────────────────────────────

  async create(data: Partial<User>): Promise<User> {
    try {
      const user = this.usersRepository.create(data); // instancia sin persistir
      return await this.usersRepository.save(user);   // INSERT
    } catch (error) {
      // Código SQLITE_CONSTRAINT_UNIQUE
      if (error.message?.includes('UNIQUE constraint failed')) {
        throw new ConflictException('El email ya está registrado');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.findOne(id); // lanza 404 si no existe
    await this.usersRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // lanza 404 si no existe
    await this.usersRepository.delete(id);
  }
}
