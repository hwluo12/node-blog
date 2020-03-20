<template>
  <el-row class="header">
    <el-col :span="20">
      <div>欢迎来到博客</div>
    </el-col>
    <el-col :span="4" class="user">
      <div v-if="login">
        <i class="el-icon-user"></i>
        <span class="username">欢迎：{{username}}</span>
        <i class="el-icon-switch-button"></i>
      </div>
      <div v-else>
        <el-button>登录</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState(["login", "username"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header {
  line-height: 60px;
  border-bottom: 1px solid #eee;
}

.user {
  text-align: center;
}

.username {
  padding: 0 10px;
  cursor: pointer;
}

.login {
  padding: 0 10px;
  cursor: pointer;
}
</style>
