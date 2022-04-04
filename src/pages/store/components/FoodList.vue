<template>
  <div class="food_list" v-if="index === 0">
    <van-tree-select
  height="88vw"
  :items="items"
  v-model:main-active-index="activeIndex"
  @click-nav="navClick"
>
  <template #content>
    <div v-for="(i,index) in supItem" :key="index" class="item_bg">
      <FoodList :item='i' :showAdd='true' :addClick='addClick' :onChange='onChange'/>
    </div>
  </template>
</van-tree-select>
  </div>
  <div v-else>{{ foodData.content }}</div>
</template>

<script>
import {reactive,toRefs} from "vue"
import FoodList from "../../../components/FoodList.vue"
export default {
  props: ["index", "foodData"],
  components:{
    FoodList,
  },
  setup(props) {
    let data=reactive({
      activeIndex:0,
      items: [],
      supItem:[],
    })
    
     //数据的初始化
    const init = ()=>{
      let newList=[]
      props.foodData?.items?.map((i,index)=>{
        newList.push({text:i.text})
        if(data.activeIndex===index){
          data.supItem=i.children
        }
      })
      data.items=newList
    }
    init()

    //点击左侧的导航
    const navClick=(i)=>{
      data.activeIndex=i
      init()
    }
    //切换步进器
    const addClick=(i)=>{
      data.supItem.forEach((item)=>{
        if(item.id===i){
          item.add=false
          item.num+=1
        }
      })
    }
    //步增器增加触发机制
    const onChange=(value,detail)=>{
      data.supItem.forEach((item)=>{
        if(item.id===detail.name){
          item.num=value
        }
      })
    }
    return {
      ...toRefs(data),
      navClick,
      addClick,
      onChange,
    }
  },
};
</script>

<style lang='less' scoped>
.food_list {
  margin-top: 20px;
  .item_bg {
    padding: 10px;
  }
}

/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>