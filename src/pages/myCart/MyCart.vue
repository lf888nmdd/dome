<template>
<div class="cart">
  <MyHeader title="购物车" :edit="true"/>
  <CartDatails v-if="isShow" :changeShow="changeShow"/>
  <MyBlank v-else/>
  <FooterMock/>
</div>
</template>

<script>
import FooterMock from "../../components/FootereMock.vue"
import MyBlank from "../../components/MyBlank.vue"
import MyHeader from "../../components/MyHeader.vue"
import CartDatails from "./components/CartDatails.vue"
import {ref,onMounted} from "vue"
import {useStore} from "vuex"
export default {
    components:{
      FooterMock,
      MyBlank,
      MyHeader,
      CartDatails,
    },
    setup(){
      const store=useStore()
      const isShow=ref(true)
      //初始化兜底样式展示与否
      const init = ()=>{
        if(store.state.cartList.length===0){
          
          isShow.value=false
        }
      }
      onMounted(()=>{
        init()
      })

      const changeShow=()=>{
        isShow.value=false
      }

      return {
        isShow,
        changeShow,
      }
    }
}
</script>

<style lang="less" scoped>
.cart{
  display:flex;
  flex-flow:column;
  height: 100%;
  .contetn{
    flex: 1;
    overflow-y:auto;
  }
}
</style>