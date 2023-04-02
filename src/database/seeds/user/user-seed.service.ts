import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleType } from '../../../constants';
import { UserEntity as User } from '../../../modules/user/user.entity';
@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: RoleType.ADMIN,
      },
    });

    const countSuperAdmin = await this.repository.count({
      where: {
        role: RoleType.SUPER_ADMIN,
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@gmail.com',
          password: process.env.DATABASE_PASSWORD || 'secret',
          role: RoleType.ADMIN,
        }),
      );
    }

    if (countSuperAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'superAdmin@gmail.com',
          password: process.env.DATABASE_PASSWORD || 'secret',
          role: RoleType.SUPER_ADMIN,
        }),
      );
    }
  }
}
