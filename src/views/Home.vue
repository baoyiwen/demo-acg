<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model="test">
    <p>值: {{test}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@c/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      test: "",
    }
  }
}
</script>

<style lang="less" scoped>
  .home{
    height: 5000px;
  }
</style>
