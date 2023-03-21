import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isdarkmode: boolean = false;
  private modesSubject = new BehaviorSubject<boolean>(false);
  modesObs = this.modesSubject.asObservable();

  togglemode() {
    this.isdarkmode = !this.isdarkmode;
    this.modesSubject.next(this.isdarkmode);
  }
}
