<template>
    <div id="app">
        <el-container>
            <el-header>
                <span>下载APP</span>
                <div class="weather">
                    <span>北京</span>
                    <span>{{this.$store.state.weather.current_condition}}</span>
                    <span>{{this.$store.state.weather.dat_low_temperature}}°/{{this.$store.state.weather.dat_high_temperature}}°</span>
                    <i class='el-icon-arrow-down'></i>
                    <div class='weatherInfo'>
                        <div style='overflow: hidden'>
                            <span class='weatherCity'>北京</span>
                            <span class='weatherWind'>北风4级</span>
                            <span class='weatherLevel'>良 62</span>
                        </div>
                        <div class='weatherDay'>
                            <p class='day'>今天</p>
                            <p id='dayImg' class='weatherImg'></p>
                            <p class='template'>{{this.$store.state.weather.dat_low_temperature}}°/{{this.$store.state.weather.dat_high_temperature}}°</p>
                        </div>
                        <div class='weatherDay'>
                            <p class='day'>明天</p>
                            <p id='tomImg' class='weatherImg'></p>
                            <p class='template'>{{this.$store.state.weather.tomorrow_low_temperature}}°/{{this.$store.state.weather.tomorrow_high_temperature}}°</p>
                        </div>
                        <div class='weatherDay'>
                            <p class='day'>后天</p>
                            <p id='aftImg' class='weatherImg'></p>
                            <p class='template'>{{this.$store.state.weather.forecast_list[3].low_temperature}}°/{{this.$store.state.weather.forecast_list[3].high_temperature}}°</p>
                        </div>
                    </div>
                </div>
                <ul>
                    <li style="background-color:red">登录</li>
                    <li>反馈</li>
                    <li>投诉侵权</li>
                    <li>头条产品</li>
                </ul>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <img src="../static/logo.png" alt="">
                    <ul>
                        <li v-for="item of tabNav" :key="item.title" :class="{current:item.title == $route.name}" @click="routerGo(item.url)">{{item.title}}</li>
                    </ul>
                </el-aside>
                <el-main>
                    <router-view />          
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return{
            tabNav:[
                {
                    "title": "推荐",
                    "url": "/news_tuijian"
                },
                {
                    "title": "热点",
                    "url": "/news_hots"
                },
                {
                    "title": "汽车",
                    "url": "/news_cars"
                },
                {
                    "title": "视频",
                    "url": "/news_videos"
                },
                {
                    "title": "图片",
                    "url": "/news_images"
                },
                {
                    "title": "科技",
                    "url": "/news_tecs"
                },
                {
                    "title": "娱乐",
                    "url": "/news_funs"
                },
                {
                    "title": "游戏",
                    "url": "/news_games"
                },
            ],
            weathers:[
                {
                    title: '晴',
                    url: '../static/qing.png'
                },
                {
                    title: '多云',
                    url: '../static/duoyun.png'
                }
            ]
        }
    },
    created(){
        this.$store.dispatch('GETWEATHER');
    },
    mounted(){
        var vm = this;
        vm.weathers.forEach((item)=>{
            if(item.title == vm.$store.state.weather.dat_condition){
                $('#dayImg').css('background',`url(${item.url}) no-repeat center center`);
            }
            if(item.title == vm.$store.state.weather.tomorrow_condition){
                $('#tomImg').css('background',`url(${item.url}) no-repeat center center`);
            }
            if(item.title == vm.$store.state.weather.forecast_list[3].condition){
                $('#aftImg').css('background',`url(${item.url}) no-repeat center center`);
            }
        });
       
        this.$store.dispatch('GETNEWS_HOTS');
    },
    methods:{
        routerGo(url){
            var URL = url.toUpperCase().substring(1);
            var _url = url.substring(1);
            this.$router.push({path:url},()=>{this.$store.dispatch('GET'+URL)});
        }
    }
};
</script>

<style scoped lang='stylus'>
#app {
    .el-header{
        height 30px !important
        color white
        background-color black
        line-height 30px
        text-align center
        span{
            float left
            width 70px
            margin right 10px
        }
        .weather{
            float left
            width 150px
            margin-left 20px
            font-size 14px
            span{
                width 40px
            }
            cursor pointer
            .weatherInfo{
                display none
                position relative
                z-index 1
                width 240px
                overflow hidden
                background-color #fff
                border 1px solid #eee
                color #333
                span{
                    margin-right 5px
                }
                .weatherCity{
                    margin-left 10px
                    width 30px
                    font-size 12px
                }
                .weatherWind{
                    width 60px
                    font-size 14px
                }
                .weatherLevel{
                    margin-top 5px
                    font-size 12px
                    height 20px
                    border-radius 3px
                    line-height 20px
                    color white
                    background-color green
                }
                .weatherDay{
                    float left
                    width 70px
                    margin 5px
                    .day{
                        font-size 12px
                    }
                    .weatherImg{
                        width 70px
                        height 50px
                    }
                    .template{
                        font-size 16px
                    }
                }
            }
            &:hover{
                .weatherInfo{
                    display block
                }
            }
        }
        ul{
            list-style none
            float right
            overflow-y
            li{
                float left
                padding 0 5px
                margin-right 10px
            } 
        }
    }
    .el-aside{
        padding-left 60px
        position fixed
        img{
            width 100px
            margin 20px 0
        }
        ul{
            width 100px
            li{
                width 100%
                text-align center
                height 40px
                line-height 40px
                margin 10px 0
                &.current{
                    background-color red
                    color white
                    border-radius 4px
                }
            }
        }
    }
    .el-main{
        margin-left 200px
    }
}
</style>
