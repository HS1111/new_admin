<template>
  <div class="acticle-containter">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">内容管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择活动区域">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item,index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="loadArticle(1)">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="articles" stripe border v-loading="loading">
        <el-table-column prop label="封面">
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover.images[0]"
              class="cover"
              :src="scope.row.cover.images[0]"
              alt
            />
            <img v-else class="cover" src="@/assets/noImage.jpg" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status == 1" type="success">待审核</el-tag>
            <el-tag v-if="scope.row.status == 2">审核通过</el-tag>
            <el-tag v-if="scope.row.status == 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status == 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle
              type="primary"
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              circle
              type="danger"
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :disabled="loading"
        layout="prev, pager, next"
        :total="countTotal"
        @current-change="onChange"
        :page-size="pageSize"
        :current-page.sync="page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getChannel, deleteArticle } from "@/api/article";
export default {
  name: "acticle-containter",
  data() {
    return {
      form: {},
      countTotal: 0,
      pageSize: 20,
      status: null,
      articles: [],
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true,
      page: 1
    };
  },
  created() {
    this.loadArticle();
    this.loadChannel();
  },
  mounted() {},
  methods: {
    loadArticle(page = 1) {
      this.loading = true;
      getArticle({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        //console.log(res.data);
        this.articles = res.data.data.results;
        this.countTotal = res.data.data.total_count;
        this.loading = false;
      });
    },
    onChange(page) {
      //console.log(page)
      this.loadArticle(page);
    },
    loadChannel() {
      getChannel().then(res => {
        //console.log(res.data);
        this.channels = res.data.data.channels;
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticle(id.toString()).then(res => {
            //console.log(res.data);
            this.loadArticle(this.page);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
.el-table th {
  line-height: 24px !important;
}
.box-card {
  margin: 0 0 15px 0;
}
.el-pagination {
  margin: 15px 0 0 0;
}
.cover {
  width: 50px;
  background-size: cover;
}
</style>
