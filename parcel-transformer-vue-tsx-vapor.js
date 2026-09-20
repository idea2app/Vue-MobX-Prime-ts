const { Transformer } = require('@parcel/plugin')
const { transform } = require('@vue-jsx-vapor/compiler-rs')
const { join } = require('node:path')

module.exports = new Transformer({
  async transform({ asset, options }) {
    asset.invalidateOnFileChange(join(options.projectRoot, 'src/vue-jsx-vapor-runtime.ts'))
    asset.invalidateOnFileChange(join(options.projectRoot, 'parcel-transformer-vue-tsx-vapor.js'))

    const source = await asset.getCode()
    const { code } = transform(source, {
      filename: asset.filePath,
      sourceMap: false,
      interop: true,
      hmr: options.mode === 'development',
      runtimeModuleName: 'vue-jsx-vapor-runtime'
    })

    asset.type = 'js'
    asset.setCode(code)

    return [asset]
  }
})
