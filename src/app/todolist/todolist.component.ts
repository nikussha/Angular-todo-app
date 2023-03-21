import { ThemeService } from './../theme.service';
import { TodoService } from './../todo.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Todo } from '../todo';
import { state } from '../state';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  highlight: boolean = false;
  arrayOfTodos: Observable<Todo[]> = new Observable();
  todosleft: Observable<number> = this.serv.ActivetodoObs;
  styledbtns: 'All' | 'Completed' | 'Active' = 'All';
  constructor(private serv: TodoService, private theme: ThemeService) {
    this.theme.modesObs.subscribe((val) => {
      this.highlight = val;
    });
  }
  ngOnInit(): void {
    this.arrayOfTodos = combineLatest(
      this.serv.todosObs,
      this.serv.stateObs
    ).pipe(
      map(([arr, st]: [Todo[], string]) => {
        if (st === 'Completed') {
          let left = arr.filter((item) => !item.iscomplete).length;
          this.serv.Activetodo.next(left);
          this.styledbtns = 'Completed';
          return arr.filter((item) => item.iscomplete);
        } else if (st === 'Active') {
          let left = arr.filter((item) => !item.iscomplete).length;
          this.serv.Activetodo.next(left);
          this.styledbtns = 'Active';
          return arr.filter((item) => !item.iscomplete);
        }

        let left = arr.filter((item) => !item.iscomplete).length;
        this.serv.Activetodo.next(left);
        this.styledbtns = 'All';
        return arr;
      })
    );
  }

  changestate(newstate: any) {
    this.serv.chngstate(newstate);
  }
  deleteTodos() {
    this.serv.cleartodos();
  }
}
