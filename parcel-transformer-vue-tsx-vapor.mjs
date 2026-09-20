import { Transformer } from '@parcel/plugin';
import SourceMap from '@parcel/source-map';
import { transform } from '@vue-jsx-vapor/compiler-rs';
import { join } from 'node:path';

const ParcelSourceMap = SourceMap.default;

export default new Transformer({
  async transform({ asset, options }) {
    asset.invalidateOnFileChange(join(options.projectRoot, 'src/vue-jsx-vapor-runtime.ts'));
    asset.invalidateOnFileChange(join(options.projectRoot, 'parcel-transformer-vue-tsx-vapor.mjs'));

    const source = await asset.getCode();
    const { code, map } = transform(source, {
      filename: asset.filePath,
      sourceMap: Boolean(asset.env.sourceMap),
      interop: true,
      hmr: options.mode === 'development',
      runtimeModuleName: 'vue-jsx-vapor-runtime'
    });

    asset.type = 'js';
    asset.setCode(code);

    if (map) {
      const sourceMap = new ParcelSourceMap(options.projectRoot);

      sourceMap.addVLQMap(JSON.parse(map));
      asset.setMap(sourceMap);
    }

    return [asset];
  }
});
