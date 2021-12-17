import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../interfaces/IUser'
import { catchError, filter, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  public getUser(id: number): Observable<User> {
    return this.getUsers()
      .pipe(
        mergeMap((data: User[]) => data),
        filter((user: User) => user.id === id)
      )
  }

  public deleteUser(id: number): Observable<unknown> {
    return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .pipe(catchError((err) => {
        console.log(err);
        return of({});
      }));
  }
}
