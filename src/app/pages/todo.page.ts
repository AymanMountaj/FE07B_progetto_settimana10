import { Component, OnInit } from '@angular/core';
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
              <button class="completato" (click)="completato(item, i)">☠</button>
            </li>
          </ul>

        </ng-container>
        <ng-template #alternativo>
          <p>Recupero Tasks...</p>
        </ng-template>
      </div>
      <div class="input-area">
        <input type="text" [(ngModel)]="nuovoTask">
        <button (click)="creaVoce()">Aggiungi</button>
      </div>
      <ng-template #noTask>
        <p>Oops, non ci sono Task</p>
      </ng-template>
    </div>
  `,
  styles: [`
  .main-container{
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  button.completato {
    background:transparent;
    border:none;
    cursor:pointer;
  }
  .input-area {
    margin-top: 1rem;
  }
  `
  ]
})
export class TodoPage implements OnInit {

  vociTodo!: Todo[];
  nuovoTask:string | undefined;

  constructor() {
    FunzioniTodo.prendiArray().then(todoArray => this.vociTodo = todoArray.filter(todo => !todo.completed))
  }

  ngOnInit(): void {
  }

  async creaVoce(){
    const voce = await FunzioniTodo.aggiungiVoce({title: this.nuovoTask as string, completed:false});
    this.vociTodo.push(voce);
    this.nuovoTask = '';
  }
  async completato(todo:Todo, i:number){
    await FunzioniTodo.aggiorna({completed:true}, todo.id)
    this.vociTodo.splice(i, 1)
  }

}
