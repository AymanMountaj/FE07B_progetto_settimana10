import { Todo } from "./models/todo";

let todoArray : Todo[] = [];

export function prendiArray(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todoArray);
    }, 2000);
  });
}

export function aggiungiVoce(todo: Omit<Todo, 'id'>): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nuovaVoce : Todo = {...todo, id: todoArray.length +1 };
      todoArray.push(nuovaVoce);
      resolve(nuovaVoce);
    }, 2000)
  });
}

export function aggiorna(nuovaVoce: Partial<Todo>, id:number): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      todoArray = todoArray.map((todo) => todo.id == id ? {...todo, ...nuovaVoce} : todo);
      const todoAggiornato = todoArray.find((todo) => todo.id == id);
      if(todoAggiornato) {
        resolve(todoAggiornato);
      } else {
        reject('Opss qui non c\'è niente');
      }
    }, 2000);
  })
}
