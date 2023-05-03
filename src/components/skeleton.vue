<template>
  <div class="container">
    <div class="common-layout">
      <el-header>

        <div class="header">Lozijy的库</div></el-header>
<!--      <el-button type="primary" round>return</el-button>-->
      <el-container>

        <el-main width="1000px">
<!--          <p>11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>-->
<!--          <div v-html="renderedMarkdown"></div>-->
<!--          <passage></passage>-->
            <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import repository from "@/views/repository/repository.vue";
import Passage from "@/views/passage/passage.vue";

export default {

  name: "skeleton",
  components: {Passage,repository}
}
</script>

<style scoped>

</style>