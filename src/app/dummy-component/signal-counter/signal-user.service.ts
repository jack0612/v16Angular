import { Injectable, signal } from "@angular/core";

interface SignalUser {
  id: string;
  name: string;
  age: number;
}
 
@Injectable(
    {
        providedIn:'root'
    }
)
export class SignalUserService {
  private _users = signal<SignalUser[]>([]);
  users = this._users.asReadonly();
 
  addUser(newUser: SignalUser): void {
   // mutating current value
   this._users.mutate(users => users.push(newUser));
  }
 
  removeUser(id: string): void {
   // setting a new value created from the current
   this._users.update(users => users.filter(user => user.id !== id));
  }
 
  getUser(id: string): SignalUser | null {
   return this._users().find(user => user.id === id) ?? null;
  }
 
  resetUsers(): void {
   // setting a new value, replacing the existing
   this._users.set([]);
  }
}