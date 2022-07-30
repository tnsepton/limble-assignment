import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Kevin'
    },
    {
      id: 2,
      name: 'Jeff'
    },
    {
      id: 3,
      name: 'Bryan'
    },
    {
      id: 4,
      name: 'Gabbey'
    }
  ]

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  getUsersByNameSearch(search: string): User[] {
    if(search.length === 0) {
      return this.getUsers();
    }

    const users: User[] = [];
    search = search.toLowerCase();

    for(const user of this.users) {
      const name = user.name.toLowerCase();
      if(name.includes(search)) {
        users.push(user);
      }
    }

    return users;
  }

  getUserById(userId: number): User | boolean {
    for(const user of this.users) {
      if(user.id === userId) {
        return user;
      }
    }

    return false;
  }

  notifyUser(userId: number): void {
    const user = this.getUserById(userId);
    if(typeof user === 'boolean') {
      return;
    }

    alert(user.name + ': You have been tagged in a comment!');
  }
}
