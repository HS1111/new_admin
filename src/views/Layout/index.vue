<template>
  <div class="layout-containter">
    <el-container>
      <el-aside :width="Collapse ? '64px': '260px' ">
        <Aside class="aside-menu" :isCollapse="Collapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <div class="title">
            <i
              :class="{'el-icon-s-fold':Collapse,'el-icon-s-unfold': !Collapse}"
              @click="Collapse = !Collapse"
            ></i>
          </div>
          <div class="user">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-s-custom el-size"></i>
                <span>{{user.name}}</span>
                <i class="el-icon-arrow-down"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
import { getUseInfo } from "@/api/user";
import globalBus from '@/utils/global-bus'
export default {
  name: "layout-containter",
  data() {
    return {
      user: {},
      Collapse: false
    };
  },
  created() {
    this.loadUser();
    globalBus.$on("update-user", (data) => {
      // this.user = data // 注意：不要这么做，对象之间赋值的是引用，会导致相互影响的问题
      this.user.name = data.name;
      this.user.photo = data.photo;
    });
  },
  mounted() {},
  methods: {
    loadUser() {
      getUseInfo().then(res => {
        this.user = res.data.data;
      });
    },
    onLogout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  components: {
    Aside
  }
};
</script>

<style lang="less">
.layout-containter {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  border-bottom: 1px solid #ddd;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  .aside-menu {
    height: 100% !important;
    ul {
      height: 100% !important;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu-item {
  text-align: left;
}
.el-size {
  font-size: 20px;
  border: 1px solid #333;
  padding: 5px;
  border-radius: 50%;
}
.el-dropdown span {
  margin: 0 10px 0 10px;
}
</style>
