// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vueaxios from 'vue-axios'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Vueaxios, axios)

Vue.config.productionTip = false

const store = new Vuex.Store({
    state:{
        hotsshuju:[],
        carsshuju:[],
        prevshuju:[],
        count: 0,
        weather:[],
        xianshi: false
    },
    mutations:{
        GETNEWS_HOTS(state,payload){
            state.hotsshuju = payload;
        },
        GETNEWS_CARS(state,payload){
            state.prevshuju.unshift(...state.carsshuju);
            state.carsshuju = payload;
            state.count = payload.length;
            state.count = 0;
        },
        GETNEWS_CARS_LAZY(state,payload){
            state.count = 0;
            state.prevshuju.push(...payload);
        },
        GETWEATHER(state, payload){
            state.weather = payload;
        }
    },
    actions:{
        async GETNEWS_HOTS({commit},payload){
            $.ajax({
                type:"GET",
                url:"https://www.toutiao.com/api/pc/feed/?category=news_hot&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1A57A153C91D6F&cp=5A5C316D065F8E1&_signature=M0RiyQAAaR79L-QbehXGeTNEYt",
                dataType:"jsonp",
                success: function(data){
                   commit("GETNEWS_HOTS",data.data) 
                }
            });
        },
        async GETNEWS_CARS({commit},payload){
            $.ajax({
                type:"GET",
                url:"https://www.toutiao.com/api/pc/feed/?category=news_car&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A195BA55DC757DE&cp=5A5CD5573DEE4E1&_signature=-dgTlwAAo403s5VF0pw0tfnYE4",
                dataType:"jsonp",
                success: function(data){
                   commit("GETNEWS_CARS",data.data) 
                }
            });
            // const data = await fetch('https://www.toutiao.com/api/pc/feed/?category=news_car&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A195BA55DC757DE&cp=5A5CD5573DEE4E1&_signature=-dgTlwAAo403s5VF0pw0tfnYE4',{
            //     method:'GET',
            //     headers:new Headers({
            //         'Content-Type':'application/x-www-form-urlencoded'
            //     })
            // }).then(res=>console.log(JSON.stringify(res)));
            // console.log(data)
        },
        async GETNEWS_CARS_LAZY({commit},payload){
            $.ajax({
                type:"GET",
                url:"https://www.toutiao.com/api/pc/feed/?category=news_car&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A195BA55DC757DE&cp=5A5CD5573DEE4E1&_signature=-dgTlwAAo403s5VF0pw0tfnYE4",
                dataType:"jsonp",
                success: function(data){
                   commit("GETNEWS_CARS_LAZY",data.data) 
                }
            });
        },
        async GETWEATHER({commit},payload){
            $.ajax({
                type: 'GET',
                url: 'https://www.toutiao.com/stream/widget/local_weather/data/?city=北京',
                dataType: 'jsonp',
                success: function(data){
                    commit('GETWEATHER',data.data.weather)
                }
            })
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
