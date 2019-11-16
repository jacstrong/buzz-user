module.exports = {
  outputDir: './server/dist',
  devServer: {
    port: 3031,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ['vuetify']
}
