import { observer } from 'mobx-vue-helper';

import counterStore from '../models/Counter';

/**
 * Example of a function component using the observer wrapper
 * This component will automatically react to changes in the MobX store
 */
export default observer(() => (
  <div>
    <h1>Function Component with MobX Observer</h1>
    <div>
      <p>Count: {counterStore.count}</p>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
    </div>
  </div>
));
