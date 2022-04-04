<template >
<div class="order">
  <MyHeader title="订单"/>
    <div class="contetn">
      <van-tabs color="#ffc400">
        <van-tab v-for="(i,index) in navData" :key="index" :title="i">
        <template v-for="(i,index) in store.state.orderListed"  :key="index"
          >
          <template v-if="store.state.orderListed.length" >
          <van-card
          :num="i.num"
          :price="i.price"
          :title="i.title"
          :thumb="i.pic"
          
        />
        </template>
        <MyBlank v-else />
        </template>
        </van-tab>
      </van-tabs>
    </div>
    <FooterMock/>
</div>
</template>

<script>
import FooterMock from "../../components/FootereMock.vue"
import MyHeader from "../../components/MyHeader.vue"
import {reactive,toRefs} from "vue"
import {useStore} from "vuex"
import MyBlank from "../../components/MyBlank.vue"
export default {
    components:{
      FooterMock,
      MyHeader,
      MyBlank,
    },
    setup(){
      const store=useStore()
      const data = reactive({
        navData:['全部','交易完成','待付款','代发货','已发货']
      })
      return {
        ...toRefs(data),
        store,
      }
    }
}
</script>

<style lang="less" scoped>
.order{
  display:flex;
  flex-flow:column;
  height: 100%;
  .contetn{
    flex: 1;
    overflow-y:auto;
  }
}
</style>