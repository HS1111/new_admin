<template>
  <div class="publish-containter">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/publish">发布文章</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-form ref="form" :model="form1" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form1.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-tiptap v-model="form1.content" :extensions="extensions" placeholder="请输入文章内容"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form1.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="form1.channel_id" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item,index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getChannel,
  addArticle,
  getArticle1,
  editArticle
} from "@/api/article";
import { uploadImage } from "@/api/image";

import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Image,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextColor,
  Fullscreen,
  Preview,
  CodeBlock
} from "element-tiptap";

export default {
  name: "publish-containter",
  data() {
    return {
      form1: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Image({
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then(res => {
              return res.data.data.url;
            });
          }
        }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在 5 到 30 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(newError("请输入文章内容"));
              } else {
                callback();
              }
            }
          }
        ],
        channel_id: [{ required: true, message: "请选择文章频道" }]
      }
    };
  },
  created() {
    this.loadChannel();
    //console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
  mounted() {},
  methods: {
    loadChannel() {
      getChannel().then(res => {
        //console.log(res.data);
        this.channels = res.data.data.channels;
      });
    },
    onSubmit(draft = false) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.query.id) {
            editArticle(this.$route.query.id, this.form1, draft).then(res => {
              console.log(res.data);
              this.$message({
                message: "修改成功",
                type: "success"
              });
            });
          } else {
            addArticle(this.form1, draft).then(res => {
              console.log(res.data);
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.push("/article");
            });
          }
        } else {
          return false;
        }
      });
    },

    loadArticle() {
      getArticle1(this.$route.query.id).then(res => {
        this.form1 = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin: 0 0 15px 0;
}
</style>
