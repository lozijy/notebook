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
export default {

  name: "skeleton",
}
</script>

<style scoped>

</style>