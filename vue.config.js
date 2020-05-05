module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/larimar/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }, 
  pwa: {
    name: 'Larimar',
    themeColor: '#85d0e7',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true
    } 
  }  
};