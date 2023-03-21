import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap, Observable } from 'rxjs';
import { state } from './state';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoArr$ = new BehaviorSubject<Todo[]>([]);
  private todoState$ = new BehaviorSubject<state>(state.all);
  Activetodo = new BehaviorSubject<number>(0);

  todosObs = this.todoArr$.asObservable();
  stateObs = this.todoState$.asObservable();
  ActivetodoObs: Observable<number> = this.Activetodo.asObservable();

  addtodo(todo: Todo) {
    if (todo.task !== null) {
      let value = this.todoArr$.getValue();
      let itemexists = value.find(
        (item) => item.task.toLowerCase() === todo.task.toLowerCase()
      );
      if (!itemexists) {
        value.push(todo);
      }
    }
    let uncomplete = this.todoArr$
      .getValue()
      .filter((item) => !item.iscomplete).length;
    this.Activetodo.next(uncomplete);
  }
  chngstate(newstate: any) {
    this.todoState$.next(newstate);
  }

  completetask(todo: Todo | undefined) {
    let arr = this.todoArr$.getValue();
    arr = arr.map((item: Todo) => {
      if (item.task === todo?.task) {
        return { ...item, iscomplete: !item.iscomplete };
      }
      return item;
    });
    this.todoArr$.next(arr);
  }
  cleartodos() {
    let arr: Todo[] = [];
    this.todoArr$.next(arr);
  }

  deletetodo(todo: Todo | undefined) {
    let arr = this.todoArr$.getValue();
    arr = arr.filter((item: Todo) => {
      return item.task !== todo?.task;
    });
    this.todoArr$.next(arr);
  }
  constructor() {}
}
