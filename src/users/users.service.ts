import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'frank ebi',
      email: 'franke@f.steez',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'james franko',
      email: 'james@f.steez',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Big wiz',
      email: 'Bigw@f.steez',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Davido Adeleke',
      email: 'DavidA@f.steez',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Stormzy Black',
      email: 'StormzB@f.steez',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINNER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return {...user,...updatedUser}
      }
      return user
    })
    return this.findOne(id)
    
  }


  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser
  }
}
