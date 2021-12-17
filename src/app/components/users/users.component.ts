import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/IUser';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private loadUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.onDestroy$), catchError((err: any) => {
      console.log(err);
      return of([]);
    })).subscribe((data: User[]) => {
      console.log(data);
      this.users = data
    })
  }

  onUserClick(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
