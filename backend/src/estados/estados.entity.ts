import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['estado', 'uf'])
export class Estados {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estado: string;

  @Column()
  uf: string;

  @CreateDateColumn()
  criado_em: Date;

  @Column({
    nullable: true,
  })
  criado_por: string;

  @UpdateDateColumn()
  modificado_em: Date;

  @Column({
    nullable: true,
  })
  modificado_por: string;

  @DeleteDateColumn()
  deletado_em: Date;

  @Column({
    nullable: true,
  })
  deletado_por: string;
}
