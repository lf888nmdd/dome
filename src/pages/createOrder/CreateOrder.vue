<template>
  <div class="create_order">
      <MyHeader title="订单页面"/>
      <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
      <div class="content">
        <div v-for="(i,index) in store.state.orderList" :key="index">
            <van-card
                :num="i.num"
                :price="i.price"
                :title="i.title"
                :thumb="i.pic"
                />
        </div>
      </div>
      <div class="pay-wrap">
          <div class="price">
              <span>商品金额</span>
              <span>￥{{allPrice}}</span>
          </div>
          <van-button class="pay-btn" type="primary" @click="handlecreateorder" color="#ffc400" block>生成订单</van-button>
      </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader.vue"
import {reactive,toRefs} from "vue"
import {useStore} from "vuex"
import {onMounted} from "vue"
import {useRouter,useRoute} from "vue-router"
import {Dialog,} from "vant"
export default {
    components:{
        MyHeader,
    },
    setup(){
        const router = useRouter()
        const store = useStore()
        const route = useRoute()
        const chlilxr=reactive({
            name:'',
            tel:'',
            allPrice:0,
        })

        //地址编辑按钮
        const onEdit=()=>{
            router.push('/address')
        }

        //生成订单按钮
        const handlecreateorder=()=>{
            Dialog.alert({
                title: '提示',
                message: '恭喜！您的订单已完成',
                }).then(() => {
                    let newList = store.state.cartList.filter((item) => {
                        return !route.query.list.includes(item.id + "");
                    });
                    store.commit('DELETE',newList)
                    store.commit('UPDATEORDER')
                    router.push('/order')
                });
        }

        //用户信息初始化
        const initUser=()=>{
            store.state.userAddress.forEach((item)=>{
                if(item.isDefault){
                    chlilxr.name=item.name
                    chlilxr.tel=item.tel
                }
            })
        }


        //总价的初始化
        const initprice = ()=>{
            let price = 0
            store.state.cartList.forEach((item)=>{
                price+=item.num*item.price
            })
            chlilxr.allPrice=price
        }

        onMounted(()=>{
            initprice()
            initUser()
        })

        return {
            ...toRefs(chlilxr),
            onEdit,
            store,
            handlecreateorder,
        }
    }

}
</script>

<style lang='less' scoped>
.create_order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>