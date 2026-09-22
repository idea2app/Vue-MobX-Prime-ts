import { observer } from 'mobx-vue-helper';

import counterStore from '../models/Counter';
import { Button } from '../components/ui/button';

/**
 * Example of a function component using the observer wrapper
 * This component will automatically react to changes in the MobX store
 */
export default observer(() => (
  <main class="text-center">
    <h1>Function Component with MobX Observer</h1>
    <div>
      <p>Count: {counterStore.count}</p>
      <Button asChild>
        <button onClick={() => counterStore.increment()}>Increment</button>
      </Button>
      <Button asChild variant="outline">
        <button onClick={() => counterStore.decrement()}>Decrement</button>
      </Button>
    </div>
  </main>
));
