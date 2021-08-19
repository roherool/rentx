import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn, 
} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

import { User } from "./User";

@Entity('users_tokens')
class UserTokens {

  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public refreshToken: string;

  @Column()
  public userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  public expiresDate: Date;

  @CreateDateColumn()
  public createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { UserTokens }