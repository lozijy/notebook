<template>
  <div class="container">
    <div class="common-layout">

      <el-container>
        <el-main >
<!--          <div v-for="(item,index) in array" :key="index" >{{item}}</div>-->
          <router-view></router-view>
          <div ><el-button type="info" @click="changeDir({type:'ret' })">..</el-button></div>
          <div v-for="(item,index) in array"><el-button type="info" @click="changeDir(item)">{{ item.name }}</el-button>
          </div>
<!--          <el-descriptions-->
<!--              v-for="(item,index) in array"-->
<!--              class="margin-top .custom-descriptions "-->
<!--              :title="item"-->
<!--              :column="3"-->
<!--              :size="size"-->
<!--              border-->
<!--          >-->
<!--          </el-descriptions>-->
        </el-main>
      </el-container>
    </div>
  </div>


</template>

<script>
import { ref,reactive  } from 'vue'
import axios from "axios";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
import {marked} from "marked";
export default {
  setup() {

    let state=reactive({
          array: [],
          path:[],
          string_path:""
        }
    )
    const octokit = new Octokit(
        {
          auth: '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'
        }
    )
    octokit.repos.getContent({
      owner: 'lozijy',
      repo: 'typora_notebook',

    }).then(result => {
      for (let i = 0; i < result.data.length; i++) {
        state.array.push(result.data[i]);
      }


    }).catch(error => {
      console.error(error)
    })

    return {
      array: state.array,
      changeDir(item){
        state.array.length=0;
        if(item.type==="dir"){
          state.path.push(item.name);
          state.string_path+=item.name
          console.log(state.string_path);
          const octokit = new Octokit(
              {
                auth: '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'
              }
          )
          octokit.repos.getContent({
            owner: 'lozijy',
            repo: 'typora_notebook',
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

        }else if(item.type==="ret"){
          state.path.pop();
          state.string_path="";
          for (const pa in state.path) {
            state.string_path+=pa.name;
          }
          const octokit = new Octokit(
              {
                auth: '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'
              }
          )
          octokit.repos.getContent({
            owner: 'lozijy',
            repo: 'typora_notebook',
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
<style>

</style>