const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');

module.exports = (config, options) => {
  const indexHtmlPlugins = config.plugins.filter(
    p => p.constructor.name === 'IndexHtmlWebpackPlugin',
  );
  indexHtmlPlugins.forEach(plugin => {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: plugin._options.input,
        filename: plugin._options.output,
        chunksSortMode: 'manual',
        inject: 'body',
        cache: false,
        alwaysWriteToDisk: true,
        showErrors: true,
        chunks: [
          'runtime',
          'polyfills',
          'styles',
          'main',
        ],
      }),
    );
  });
  config.plugins.push(new BaseHrefWebpackPlugin({baseHref: options.baseHref}));
  config.plugins.push(new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
    threshold: 10240,
    minRatio: 0.8
  }));
  config.plugins.push(new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
  }));
  return config;
};
