<template>
  <div class="container">
    <div class="wrapper">
      <div class="close">
        <i class="el-icon-close" @click="onCancel"></i>
      </div>
      <el-form :model="formInline">
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="formInline.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="formInline.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "/api/user/login",
        data: {
          ...this.formInline
        }
      }).then(res => {
        const data = res.data;
        if (data && data.errno === 0) {
          this.changeLoginStatus({ login: true, username: data.data.username });
          this.$router.push("/person");
        }
      });
    },
    onCancel() {
      this.$router.push("/");
    },
    ...mapMutations(["changeLoginStatus"])
  }
};
</script>

<style lang="stylus" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
}

.wrapper {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  margin-top: 180px;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.close {
  text-align: right;
}

.el-icon-close {
  cursor: pointer;
}
</style>
