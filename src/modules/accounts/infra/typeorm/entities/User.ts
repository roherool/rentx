import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Expose } from "class-transformer";

@Entity("users")
class User {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public avatar: string;

  @Column()
  public isAdmin: boolean;

  @Column()
  public lastLogin: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.DISK) {
      case "local":
        return `${process.env.API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.isAdmin = false;
    }
  }
}

export { User };
