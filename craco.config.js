const CracoLessPlugin = require('craco-less')
const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc')

module.exports = {
  plugins: [
    { plugin: BabelRcPlugin },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#464775',
              '@input-height-lg': '43px',
              '@input-placeholder-color': '#808080',
              '@input-bg': '#F2F6FC',
              '@input-border-color': 'transparent',
              '@border-radius-base': '8px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
