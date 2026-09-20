const { Transformer } = require('@parcel/plugin')
const { transform } = require('@vue-jsx-vapor/compiler-rs')

module.exports = new Transformer({
  async transform({ asset, options }) {
    const source = await asset.getCode()
    const { code } = transform(source, {
      filename: asset.filePath,
      sourceMap: Boolean(asset.env.sourceMap),
      interop: true,
      hmr: options.mode === 'development',
      runtimeModuleName: 'vue-jsx-vapor-runtime'
    })

    asset.type = 'js'
    asset.setCode(code)

    return [asset]
  }
})
