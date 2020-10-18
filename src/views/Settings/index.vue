<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/settings">个人设置</a>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <el-row>
        <el-col :span="16">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号"> {{ user.id }}</el-form-item>
            <el-form-item label="手机"> {{ user.mobile }} </el-form-item>
            <el-form-item label="媒体名称">
              <el-input type="textarea" v-model="user.name"></el-input>
            </el-form-item>

            <el-form-item label="媒体介绍">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>

            <el-form-item label="媒体邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form>
        </el-col>
        <el-col :span="6" :offset="2" class="photo">
          <label for="file">
            <el-avatar
              shape="square"
              :size="250"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
          </label>
          <p>点击修改头像</p>
          <input
            id="file"
            type="file"
            hidden
            ref="file"
            @change="OnFileChange"
          />
        </el-col>
      </el-row>
      <!-- 修改头像 -->
      <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        append-to-body
        @opened="onDialog"
        @closed="onDialogClosed"
      >
        <div class="preview-image-wrap">
          <img class="preview-image" :src="previewImage" ref="preview-image" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUseInfo,updateUserPhoto,updateUserProfile} from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import globalBus from '@/utils/global-bus'

export default {
  data() {
    return {
      user: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
      dialogVisible: false,
      previewImage: "",
      cropper: null,
    };
  },
  created() {
    this.loadUser();
  },
  mounted() {},
  methods: {
    onSubmit() {
      updateUserProfile(this.user).then(res =>{
        this.$message({
          type:'success',
          message:'保持成功'
        })
        globalBus.$emit('update-user',this.user)
      })
    },
    loadUser() {
      getUseInfo().then((res) => {
        this.user = res.data.data;
      });
    },
    OnFileChange() {
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;
      this.$refs.file.value = "";
      this.dialogVisible = true;
    },
    onDialog() {
      const image = this.$refs["preview-image"];

      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false,
      });
    },
    onDialogClosed() {
      // this.cropper.destroy()
    },
    onUpdatePhoto(){
      this.cropper.getCroppedCanvas().toBlob((blob) =>{
        const fd = new FormData();
        fd.append('photo',file);
         updateUserPhoto(fd).then(res =>{
           console.log(res);
           this.dialogVisible = false;
           this.user.photo = this.previewImage
        })
      })
    }
  },
};
</script>

<style scoped lang="less">
.el-form {
  margin: 15px 0 15px 0;
}
.photo {
  text-align: center;
}
.photo p {
  margin: 10px auto;
}
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.preview-image-wrap {
  img {
    display: block;
    height: 200px;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
