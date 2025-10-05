import { observable } from 'mobx';

export class CounterStore {
  @observable
  accessor count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default new CounterStore();
