import { Component, OnInit } from '@angular/core';
import { TodoPage } from './todo.page';
import { Todo } from '../models/todo';
import * as FunzioniTodo from '../todo.service';

@Component({
  template: `
  <div class="main-container">
      <div>
        <ng-container *ngIf="vociTodo; else alternativo">
          <ul *ngIf="vociTodo.length > 0; else noTask">
            <li *ngFor="let item of vociTodo; let i = index">
              {{item.title}}
            </li>
          </ul>

        </ng-container>
        <ng-template #alternativo>
          <p>Recupero Tasks...</p>
        </ng-template>
      </div>
      <ng-template #noTask>
        <p>Oops, non ci sono Task completati</p>
      </ng-template>
    </div>
    `,
  styles: [ `
    .main-container {
      width: 100%;
      display:flex;
      flex-direction:column;
      align-items:center;
    }
  `
  ]
})
export class CompletedPage implements OnInit {

  vociTodo!: Todo[];

  nuovoTask:string | undefined

  constructor() {
    FunzioniTodo.prendiArray().then((todoArray) => (this.vociTodo = todoArray.filter(todo => todo.completed)));
  }

  ngOnInit(): void {
  }

}
