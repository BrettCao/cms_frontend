/**
 * Created by Smile on 2018/5/21.
 */
const resolve = require('resolve')
const withCSS = require('@zeit/next-css')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract = new ExtractTextPlugin({ filename: 'static/[contenthash].css' });
module.exports = withCSS({
    cssModules: true,
    extractCSSPlugin: extract,
    webpack (config, options) {
        const { dir, isServer } = options;

        config.externals = []

        if (isServer) {
            config.externals.push((context, request, callback) => {
                resolve(request, { basedir: dir, preserveSymlinks: true }, (err, res) => {
                    if (err) {
                        return callback()
                    }

                    // Next.js by default adds every module from node_modules to
                    // externals on the server build. This brings some undesirable
                    // behaviors because we can't use modules that require CSS files like
                    // `former-kit-skin-pagarme`.
                    //
                    // The lines below blacklist webpack itself (that cannot be put on
                    // externals) and `former-kit-skin-pagarme`.
                    if (
                        res.match(/node_modules[/\\].*\.js/)
                        && !res.match(/node_modules[/\\]webpack/)
                        && !res.match(/node_modules[/\\]former-kit-skin-pagarme/)
                    ) {
                        return callback(null, `commonjs ${request}`)
                    }

                    callback()
                })
            })
        }
        config.plugins.push(extract);
        return config
    },
})