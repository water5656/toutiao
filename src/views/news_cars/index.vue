<template>
    <div>
        <div class='tabNav'>
            <ul>
                <li v-for='item of tabNav' :key='item.title' :class="{cur: item.title=='全部'}">{{item.title}}</li>
            </ul>
        </div>
        <div v-height='110' style='overflow-y:auto;' class='haha'>
            <ul>
                <li v-for="item of this.$store.state.carsshuju" :key="item.id">
                    <div class='img'>
                        <img :src="item.image_url">
                    </div>
                    <div class="info">
                        <h1 @click='GO(item.group_id)'>{{item.title}}</h1>
                        <p>
                            <img :src="item.media_avatar_url" @click='GO(item.group_id)'>
                            <span>{{item.source}}</span>·<span>{{item.comments_count}}评论</span>·<span>{{item.behot_time | timeToNow}}前</span>
                        </p>
                    </div>
                </li>
            </ul>
            <el-button @click='GETNEWS_CARS' type='primary' style='width:650px;margin:20px 0'>{{chaTime | timeToNow}}看到这里，点击刷新 <i class='el-icon-refresh'></i></el-button>
            <!-- 上次数据 -->
            <ul>
                <li v-for="item of this.$store.state.prevshuju" :key="item.id">
                    <div class='img'>
                        <img :src="item.image_url">
                    </div>
                    <div class="info">
                        <h1 @click='GO(item.group_id)'>{{item.title}}</h1>
                        <p>
                            <img :src="item.media_avatar_url" @click='GO(item.group_id)'>
                            <span>{{item.source}}</span>·<span>{{item.comments_count}}评论</span>·<span>{{item.behot_time | timeToNow}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabNav:[
                {
                    title: '全部',
                    url: '/'
                },
                {
                    title: 'SUV',
                    url: '/'
                },
                {
                    title: 'MPV',
                    url: '/'
                },
                {
                    title: 'BEZ',
                    url: '/'
                }
            ],
            refreshTime: 0,
            chaTime: 0
        }
    },
    filters:{
        timeToNow(behot_time){
            var duringTime;
            if(behot_time < 1000*60){
                duringTime = '刚刚';
            }else if(behot_time < 1000*60*60){
                duringTime = ~~(behot_time/1000/60)+'分钟前'; 
            }else if(behot_time < 1000*60*60*60){
                duringTime = ~~(behot_time/1000/60/60)+'小时前';
            }else{
                duringTime = '1天前'
            }
            return duringTime;
        }
    },
    methods:{
        GO(id){
            window.open('https://www.toutiao.com/a'+id);
        },
        GETNEWS_CARS(){
            this.$store.dispatch('GETNEWS_CARS');
            $(window).scrollTop(0);
            this.openMessage();
            this.chaTime = 0;
        },
        openMessage(){
            this.$message({
                message:'本次更新了'+this.$store.state.count+'条信息',
                center: true
            });
        }
    },
    mounted(){
        var vm = this;
        $(window).scroll(function(){
            let scrollTop = $(this).scrollTop()
            let scrollHeight = $(document).height()
            let windowHeight = $(this).height()
            if (scrollTop + windowHeight === scrollHeight){
                vm.$store.dispatch('GETNEWS_CARS_LAZY');
            }
        });
        setInterval(function(){
            vm.chaTime += 60000
        },60000)
    },
    directives: {
        height:{
            inserted(el,bind){
                $(el).css('height',$(window).height()-bind.value)
            }
        }
    }
}
</script>

<style scoped lang='stylus'>
    .tabNav{
        width 650px
        height 38px
        margin-bottom 19px
        border-bottom 2px solid #eee
        li{
            height 28px
            font-size 16px
            text-align center
            line-height 28px
            margin-right 40px
            padding 0 0px 10px 0
            float left
            &.cur{
                color red
                border-bottom 2px solid #eee
                border-bottom-color red
            }
        }
    }
    ul{
        overflow hidden
        width 650px
        li{
            height 120px
            .img{
                width 156px
                overflow hidden
                float left
                img{
                    display block
                    width 156px
                    transition 1s ease 0s all
                    &:hover{
                        transform scale(1.05)
                    }
                }
            }
            .info{
                float left
                width 480px
                margin-left 14px
                h1{
                    font-size 20px
                    margin-bottom 15px
                    cursor pointer
                    &:hover{
                        color blue
                    }
                }
                p{
                    display block
                    height 19px
                    img{
                        display inline-block
                        width 19px
                        border-radius 999px
                        margin-right 5px
                    }
                    span{
                        height 18px
                        line-height 18px
                        text-align center
                        font-size 16px
                        margin 0 5px
                        color #777
                    }
                }
            }
        }      
    }
</style>