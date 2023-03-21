import { ThemeService } from './../../theme.service';
import { TodoService } from './../../todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Input() id: number | undefined;
  ischecked: boolean = false;
  highlight: boolean = false;
  constructor(private serv: TodoService, private theme: ThemeService) {
    this.theme.modesObs.subscribe((val) => (this.highlight = val));
  }

  ngOnInit(): void {}
  detectchange(e: Event) {
    this.serv.completetask(this.todo);
  }
  deletetodo() {
    this.serv.deletetodo(this.todo);
  }
}
