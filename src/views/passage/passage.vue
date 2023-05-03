<template>
  <div class="container">
    <div class="common-layout">
      <el-header>

        <div class="header">OS-Conception</div></el-header>
      <el-button type="primary" round>return</el-button>
      <el-container>
        <el-aside width="400px">Aside</el-aside>
        <el-main >
          <p>11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
          <div v-html="renderedMarkdown"></div>
        </el-main>
      </el-container>
    </div>
  </div>


</template>

<script>
import { ref } from 'vue'
import axios from "axios";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import {marked} from "marked";
export default {
  setup() {
    const octokit = new Octokit(
        {
          auth: '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'
        }
    )

    let msg=ref("")
    let renderedMarkdown=ref("")
    octokit.repos.getContent({
      owner: 'lozijy',
      repo: 'typora_notebook',
      path: '/12月/有趣.md'
    }).then(result => {
      console.log(result)
      const content = result.data.content
      const decodedContent = decodeURIComponent(escape(atob(content)))
      msg.value=decodedContent
      console.log(decodedContent)
      console.log(msg)
      renderedMarkdown.value=marked(msg.value);
    }).catch(error => {
      console.error(error)
    })


    return {
      msg,
      renderedMarkdown,
    }
  }
}
</script>
<style>
.header{

  font-size: 50px;
  text-align: center;
}
.container{
  border: 1px solid white;
}
h2 {
  border-bottom: 1px solid white;
  text-align: center;
}
</style>