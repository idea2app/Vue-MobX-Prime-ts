import { observer } from 'mobx-vue-helper';
import 'echarts-jsx/dist/renderers/SVG';
import 'echarts-jsx/dist/components/title';
import 'echarts-jsx/dist/components/legend';
import 'echarts-jsx/dist/components/tooltip';
import 'echarts-jsx/dist/components/x-axis';
import 'echarts-jsx/dist/components/y-axis';
import 'echarts-jsx/dist/charts/bar';

export default observer(() => (
  <ec-svg-renderer style={{ width: '100%', height: '80vh' }} onClick={console.log}>
    <ec-title text="ECharts example" />
    <ec-legend data={['sales']} />
    <ec-tooltip />
    <ec-x-axis
      data={['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']}
    />
    <ec-y-axis />
    <ec-bar-chart
      name="sales"
      data={[5, 20, 36, 10, 10, 20]}
      onClick={console.log}
    />
  </ec-svg-renderer>
));
