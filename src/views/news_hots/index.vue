<template>
    <div>
        <ul>
            <li v-for="item of this.$store.state.hotsshuju" :key="item.id">
                <div class='img'>
                    <img :src="item.image_url" alt="" @click='GO(item.group_id)'>
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
        <el-button @click='GETNEWS_HOTS' type='primary' style='width:650px'>上次看到这里，点击刷新 <i class='el-icon-refresh'></i></el-button>
    </div>
</template>

<script>
export default {
    filters:{
        timeToNow(behot_time){
            var duringTime;
            if(behot_time < 1000*60){
                duringTime = ~~(behot_time/1000)+'秒';
            }else if(behot_time < 1000*60*60){
                duringTime = ~~(behot_time/1000/60)+'分钟'; 
            }else if(behot_time < 1000*60*60*60){
                duringTime = ~~(behot_time/1000/60/60)+'小时';
            }else{
                duringTime = '1天'
            }
            return duringTime;
        }
    },
    methods:{
        GO(id){
            window.open('https://www.toutiao.com/a'+id);
        },
        GETNEWS_HOTS(){
            this.$store.dispatch('GETNEWS_HOTS');
        }
    }
}
</script>

<style scoped lang='stylus'>
    div{
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
    }
    
</style>
