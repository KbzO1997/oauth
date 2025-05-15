import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private dialogVisibility = new BehaviorSubject<boolean>(false);
  dialogVisible$ = this.dialogVisibility.asObservable();

  showDialog() {
    this.dialogVisibility.next(true);
  }

  hideDialog() {
    this.dialogVisibility.next(false);
  }
}
