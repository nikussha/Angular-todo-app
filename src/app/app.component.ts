import { ThemeService } from './theme.service';
import { TodoService } from './todo.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  highlight: boolean = false;
  constructor(private serv: TodoService, private theme: ThemeService) {
    this.theme.modesObs.subscribe((val) => {
      this.highlight = val;
    });
  }
  newtodo = new FormControl();
  addnewtodo(e: Event) {
    e.preventDefault();
    let newtodo: Todo = {
      task: this.newtodo.value,
      iscomplete: false,
    };
    this.serv.addtodo(newtodo);
    this.newtodo.reset();
  }
  highlightel() {
    this.theme.togglemode();
    console.log(this.highlight);
  }
}
