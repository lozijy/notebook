<template>
  <div class="container">
    <div class="common-layout">
      <el-container>
        <el-aside :style="{ width: '120px' }">
          <div ><el-button type="info" @click="changeDir({type:'ret' })">..</el-button></div>
          <div v-for="(item,index) in array"><el-button type="info" @click="changeDir(item)">{{ item.name }}</el-button>
        </div>
        </el-aside>
        <el-main :style="{ width: '1300px' }">
          <div v-html="renderedMarkdown"></div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref,inject} from 'vue'
import axios from "axios";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import {marked} from "marked";
export default {
  setup() {

      const credentials=inject('credentials');
      console.log(credentials.owner);
      let state=reactive({
            array: [],
            path:[],
            string_path:"",
          }
      )
      const octokit = new Octokit(
          {
            auth: credentials.token
          }
      )
    //获取根目录下的所有文件
      octokit.repos.getContent({
        owner: credentials.owner,
        repo: credentials.repo,
      }).then(result => {
        for (let i = 0; i < result.data.length; i++) {
          state.array.push(result.data[i]);
        }
      }).catch(error => {
        console.error(error)
      })

//测试
    let msg=ref("")
    let renderedMarkdown=ref("")
    // octokit.repos.getContent({
    //   owner: 'lozijy',
    //   repo: 'typora_notebook',
    //   path: '/12月/有趣.md'
    // }).then(result => {
    //   console.log(result)
    //   const content = result.data.content
    //   const decodedContent = decodeURIComponent(escape(atob(content)))
    //   msg.value=decodedContent
    //   console.log(decodedContent)
    //   console.log(msg)
    //   renderedMarkdown.value=marked(msg.value);
    // }).catch(error => {
    //   console.error(error)
    // })



    return {
      msg,
      renderedMarkdown,
      array: state.array,
      changeDir(item){
        state.path.push(item.name);
        state.string_path+="/";
        state.string_path+=item.name;
        state.array.length=0;
        if(item.type==="dir"){

          console.log(state.string_path);
          const octokit = new Octokit(
              {
                auth: credentials.token
              }
          )
          octokit.repos.getContent({
            owner: credentials.owner,
            repo: credentials.repo,
            path:state.string_path
          }).then(result => {
            for (let i = 0; i < result.data.length; i++) {
              state.array.push(result.data[i]);
            }
            console.log(state.array)
          }).catch(error => {
            console.error(error)
          })
        }else if(item.type==="file"){
          octokit.repos.getContent({
            owner: credentials.owner,
            repo: credentials.repo,
            path: state.string_path
          }).then(result => {
            const content = result.data.content
            const decodedContent = decodeURIComponent(escape(atob(content)))
            msg.value=decodedContent
            renderedMarkdown.value=marked(msg.value);
          }).catch(error => {
            console.error(error)
          })
        }else if(item.type==="ret"){
          console.log("ret")
          state.path.pop();
          state.path.splice(-1, 1)
          state.string_path="";
          console.log("ret"+state.path)
          console.log("ret")
          for (const pa of state.path) {
            console.log(pa);
            state.string_path+="/";
            state.string_path+=pa;
          }
          const octokit = new Octokit(
              {
                auth: credentials.token
              }
          )
          octokit.repos.getContent({
            owner: credentials.owner,
            repo: credentials.repo,
            path:state.string_path
          }).then(result => {
            for (let i = 0; i < result.data.length; i++) {
              state.array.push(result.data[i]);
            }
            console.log(state.array)
          }).catch(error => {
            console.error(error)
          })
        }
      }

    }
  }
}
</script>

<style scoped>

</style>