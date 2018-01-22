import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/news_hots',
            name: '热点',
            component(){
              return System.import('../views/news_hots');
            }
        },
        {
            path: '/news_cars',
            name: '汽车',
            component(){
              return System.import('../views/news_cars');
            }
        },
        {
            path: '*',
            redirect: '/news_hots'
        }
      ]
})
