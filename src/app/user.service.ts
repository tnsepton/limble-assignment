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

    let users: User[] = [];
    search = search.toLowerCase();

    for(let user of this.users)
    {
      let name = user.name.toLowerCase();
      if(name.includes(search)) {
        users.push(user);
      }
    }

    return users;
  }
}
