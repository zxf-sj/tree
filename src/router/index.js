const Index = () => import('@/components/pages/Index')// 首页;
const Garden = () => import('@/components/pages/Garden') // 园子
const Explain = () => import('@/components/pages/Explain')
// const Record = () => import('@/components/pages/Record') // 记录
// const Exchange = () => import('@/components/pages/Exchange') // 兑换中心
// const Package = () => import('@/components/pages/Package') // 兑换中心
export default [
  {
    path: '',
    component: Garden
  },
  {
    path: '/index/:id',
    component: Index
  },
  {
    path: '/explain',
    component: Explain
  }
  // {
  //   path: '/record',
  //   component: Record
  // },
  // {
  //   path: '/exchange',
  //   component: Exchange
  // },
  // {
  //   path: '/package',
  //   component: Package
  // }
]
