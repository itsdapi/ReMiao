export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  renderer: 'skyline',
  componentFramework: 'glass-easel',
  rendererOptions: {
    skyline: {
      defaultDisplayBlock: false,
    }
  },
  pages: [
    'pages/index',
    'pages/none-tabs-pages/cat-detail',
    'pages/none-tabs-pages/article-detail'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
})
