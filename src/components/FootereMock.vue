<template>
  <div class="footer">
      <div class="item">
      <router-link to="/home" class="nav_item" active-class="nav_color">
      <van-icon name="wap-home-o" size="30" />
      首页
      </router-link>
      </div>
      <div class="item">
      <router-link to="/cart" class="nav_item" active-class="nav_color">
      <van-icon name="cart-o" size="30" />
      购物车</router-link>
      </div>
      <div class="item">
      <router-link to="/order" class="nav_item" active-class="nav_color">
      <van-icon name="description" size="30" />
      订单</router-link>
      </div>
      <div class="item">
      <router-link to="/mine" class="nav_item" active-class="nav_color">
      <van-icon name="contact" size="30" />
      我的</router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer{
  font-size: 12px;
  display: flex;
  background-color: #fff;
  border-top: 0.5px solid #eee;
  .item{
    flex: 1;
    display: flex;
    justify-content: center;
    .nav_color{
      color: #ffc400;
    }
    .nav_item{
      display: flex;
      flex-flow: column;
      align-items: center;
    }
  }
}
</style>