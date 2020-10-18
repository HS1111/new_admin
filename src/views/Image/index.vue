<template>
  <div class="image-containter">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/image">素材管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="radioflex">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="全部" @click.native="loadImage(false)"></el-radio-button>
          <el-radio-button label="收藏" @click.native="loadImage(true)"></el-radio-button>
        </el-radio-group>
        <el-button type="primary" @click="dialogTableVisible = true">上传素材</el-button>
      </div>

      <el-row :gutter="20">
        <el-col :xs="12" :md="8" :xl="4" v-for="(item,index) in results" :key="index">
          <div class="grid-content bg-purple grid-pos">
            <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
            <div class="image-info"><i :class="{'el-icon-star-on':item.is_collected,'el-icon-star-off':!item.is_collected}" @click="onCollect(item)"></i><i class="el-icon-delete-solid" @click="onDelete(item)"></i></div>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="countTotal"
        @current-change="onChange"
        :page-size="per_page"
      ></el-pagination>
    </el-card>

    <!-- 添加图片弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { gettingImage,collectimage,deleteimage } from "@/api/image";
export default {
  name: "image-containter",
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      radio2: "全部",
      results: [],
      dialogTableVisible: false,
      uploadHeaders: {
        Authorization: "Bearer " + user.token
      },
      loading: true,
      countTotal: 0,
      page: 1,
      per_page: 20,
      collect1: false
    };
  },
  created() {
    this.loadImage(false);
  },
  mounted() {},
  methods: {
    loadImage(collect1, page = 1) {
      this.page = page;
      gettingImage({
        collect: collect1,
        page,
        per_page: this.per_page
      }).then(res => {
        console.log(res.data);
        this.results = res.data.data.results;
        this.countTotal = res.data.data.total_count;
      });
    },
    //上传成功
    onUploadSuccess() {
      this.dialogTableVisible = false;
      this.loadImage(false, this.page);
    },

    //点击分页
    onChange(page) {
      //console.log(page)
      this.loadImage(this.collect1, page);
    },
    //收藏
    onCollect(item){
     
        collectimage(item.id,!item.is_collected).then(res =>{
          item.is_collected = !item.is_collected
          
        })
    },
    //删除
    onDelete(item){
      deleteimage(item.id).then(res =>{
        this.loadImage(false,this.page)
      })
    }
  }
};
</script>

<style scoped lang="less">
.el-radio-group {
  margin: 15px 0;
}
.radioflex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.grid-pos {
  position: relative;
  margin: 0 0 15px 0;
}
.image-info {
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content:flex-end;
}
.image-info i{
    font-size: 16px;
    color: #fff;
    margin: 0 15px 0 0;
    
}
</style>
