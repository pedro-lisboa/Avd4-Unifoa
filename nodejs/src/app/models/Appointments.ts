import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Doctors from './Doctors';
import Pacients from './Pacients';

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctor_id: string;

  @ManyToOne(() => Doctors)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctors;

  @Column()
  pacient_id: string;

  @ManyToOne(() => Pacients)
  @JoinColumn({ name: 'pacient_id' })
  pacient: Pacients;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointments;
