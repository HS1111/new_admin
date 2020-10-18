<template>
  <div class="comment-containter">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/comment">评论管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-table :data="articles" stripe style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column prop="comment_status" label="状态">
          <template slot-scope="scope">{{scope.row.comment_status ? '正常' : '关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.comment_status" @change="onStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="countTotal" :page-size="per_page"  @current-change="onChange"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle ,upDateStatus } from "@/api/article";
export default {
  name: "comment-containter",
  data() {
    return {
      articles: [],
      countTotal: 0,
      page: 1,
      per_page: 10
      
    };
  },
  created() {
    this.loadArticles();
  },
  mounted() {},
  methods: {
    loadArticles(page =1) {
      getArticle({
        response_type: "comment",
        page: page
      }).then(res => {
        console.log(res.data.data);
        this.articles = res.data.data.results;
        this.countTotal = res.data.data.total_count;
      });
    },
    onStatusChange(article){
                           
        upDateStatus(article.id.toString(), article.comment_status).then(res =>{
            //console.log(res.data)
        })
    },
        //点击分页
    onChange(page) {
      //console.log(page)
      this.loadArticles(page)
    },
  }
};
</script>

<style scoped lang="less">
</style>
