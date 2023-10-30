import { Todo } from './../../models/todo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // set Dynamic Classes
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle in server
    // tslint:disable-next-line:no-shadowed-variable
    this.todoService.toggleCompleted(todo).subscribe( todo =>
      console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
