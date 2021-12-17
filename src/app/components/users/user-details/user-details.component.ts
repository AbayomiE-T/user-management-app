import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/IUser';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  public user: User | undefined;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersService.getUser(+this.route.snapshot.params.id)
      .pipe(takeUntil(this.onDestroy$),
        catchError((err: any) => {
          console.log(err);
          return of(undefined);
        }))
      .subscribe((user: User | undefined) => {
        console.log(user);
        this.user = user;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
