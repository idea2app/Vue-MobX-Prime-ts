import { observer } from '../observer';
import project from '../models/Project';

/**
 * Example of a function component using the observer wrapper
 * This component will automatically react to changes in the MobX store
 */
export default observer(() => (
  <div>
    <h1>Function Component with MobX Observer</h1>
    <p>Project count: {project.list.length}</p>
    <ul>
      {project.list.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
));
