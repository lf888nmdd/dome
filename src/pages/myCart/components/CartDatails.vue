<template>
  <div class="cartDetails">
    <!-- 商品列表 -->
    <div class="content">
      <van-checkbox-group v-model="checked" @change="groupChange">
        <div v-for="(i, index) in store.state.cartList" :key="index">
          <FoodList :item="i" :showCheckbox="true" :onChange="onChange" />
        </div>
      </van-checkbox-group>
    </div>
    <!-- 結算 -->
    <van-submit-bar
      :price="allPrice * 100"
      v-if="isDelete"
      button-text="結算"
      @submit="onSubmit"
      class="submit-all"
      button-color="#ffc400"
    >
      <van-checkbox
        v-model="checkedre"
        checked-color="#ffc400"
        @click="choseAll"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <!-- 删除 -->
    <div class="buy" v-else>
      <div class="left">
        <van-checkbox
          v-model="checkedre"
          checked-color="#ffc400"
          @click="choseAll"
          >全选</van-checkbox
        >
      </div>
      <div class="delete" @click="deleteClick">删除</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import FoodList from "../../../components/FoodList.vue";
import { Toast } from "vant";
import emitter from "../../../common/js/evenbus";
import {useRouter} from "vue-router"
export default {
  props: ["changeShow"],
  components: {
    FoodList,
  },
  setup(props) {
    const router = useRouter()
    const store = useStore();
    let data = reactive({
      checked: [0, 1],
      checkedre: true,
      isDelete: true,
    });

    //商品默认选中的初始化
    const init = () => {
      data.checked = store.state.cartList.map((item) => item.id);
    };
    onMounted(() => {
      init();
    });

    //商品的个数同步
    const onChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };

    //全選或者取消全選
    const choseAll = () => {
      if (data.checked.length !== store.state.cartList.length) {
        init();
      } else {
        data.checked = [];
      }
    };

    //更新数据
    const updata = (type) => {
      return store.state.cartList.filter((item) => {
        return type === 2
          ? data.checked.includes(item.id)
          : !data.checked.includes(item.id);
      });
    };

    //結算按鈕
    const onSubmit = () => {
      if (data.checked.length != 0) {
        store.commit("PAY", updata(2));
        router.push({
          path:'/createorder',
          query: {
            list: data.checked,
          },
        })
      } else {
        Toast.fail("请选择要结算的商品");
      }
    };

    //每個複選框的點擊事件觸發
    const groupChange = (result) => {
      if (result.length === store.state.cartList.length) {
        data.checkedre = true;
      } else {
        data.checkedre = false;
      }
      data.checked = result;
    };

    //總價
    const allPrice = computed(() => {
      let countList = store.state.cartList.filter(() => updata(2));
      let sum = 0;
      countList.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum;
    });

    //监听编辑的点击
    emitter.on("edit", () => {
      data.isDelete = !data.isDelete;
    });

    //删除按钮
    const deleteClick = () => {
      if (data.checked.length) {
        //更新删除后的购物车数据
        store.commit("DELETE", updata(1));

        //删除后的选中
        data.checked = [];

        //购物车无数据是展示兜底
        if (store.state.cartList.length === 0) {
          store.commit("EDIT", "delete");
          props.changeShow();
        }
      } else {
        Toast.fail("请选择要删除的商品");
      }
    };
    return {
      ...toRefs(data),
      store,
      onChange,
      onSubmit,
      choseAll,
      groupChange,
      allPrice,
      deleteClick,
    };
  },
};
</script>

<style lang='less' scoped>
.cartDetails {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 58px;
  }

  .buy {
    position: fixed;
    bottom: 58px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: #ffc400;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>