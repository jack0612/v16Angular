import { Component, computed, signal, effect } from '@angular/core';
//https://www.angular.love/en/2023/05/25/angular-signals-a-new-feature-in-angular-16/
/*
interface Signal<T> {
  (): T;
  [SIGNAL]: unkown;
}

interface WritableSignal<T> extends Signal<T> {
  set(value: T): void;
  update(updateFn: (value: T) => T): void;
  mutate(mutatorFn: (value: T) => void): void;
  asReadonly(): Signal<T>;
}

function signal<T>(
  initialValue: T,
  options?: { equal?: (a: T, b: T) => boolean }
): WritableSignal<T>


function computed<T>(
  computation: () => T,
  options?: {equal?: (a: T, b: T) => boolean}
): Signal<T>;

function effect(
  effectFn: (onCleanup: (fn: () => void) => void) => void,
  options?: CreateEffectOptions
): EffectRef;

function effect(
  effectFn: (onCleanup: (fn: () => void) => void) => void,
  options?: CreateEffectOptions
): EffectRef;


effect((onCleanup) => {
   const countValue = this.count();
   let secsFromChange = 0;
   const logInterval = setInterval(() => {
    console.log(
     `${countValue} had its value unchanged for ${++secsFromChange} seconds`
    );
   }, 1000);
   onCleanup(() => {
    console.log('Clearing and re-scheduling effect');
    clearInterval(logInterval);
   });
});
*/
@Component({
  selector: 'app-signal-counter',
  templateUrl: './signal-counter.component.html',
  styleUrls: ['./signal-counter.component.scss']
})
export class SignalCounterComponent {

  
  constructor() {
    // Writable signals
    const todos = signal([
      { id: 1, title: 'Buy groceries', completed: false },
      { id: 2, title: 'Do laundry', completed: true },
      { id: 3, title: 'Walk the dog', completed: false }
    ]); // List of todos

    const showCompleted = signal(false); // Flag indicating whether completed todos should be shown

    // Computed signal to filter and sort todos based on the showCompleted flag
    const filteredTodos = computed(() => {
      const filtered = todos().filter(todo => showCompleted() || !todo.completed);
      return filtered.sort((a, b) => a.id - b.id);
    });

    // Computed signal to count the number of remaining todos
    const remainingTodosCount = computed(() =>
      todos().reduce((count, todo) => (todo.completed ? count : count + 1), 0)
    );

    // Effect to log the filtered todos and remaining count whenever they change
    effect(() => {
      console.log('Filtered Todos:');
      console.log(filteredTodos());
      console.log(`Remaining Todos: ${remainingTodosCount()}`);
    });

    // Update the values of the writable signals
    todos.mutate(todos => {
      todos.push({ id: 4, title: 'Clean the house', completed: false });
      todos[1].completed = false;
    });

    // // Update the showCompleted flag
    // showCompleted.set(true);
  }
}
