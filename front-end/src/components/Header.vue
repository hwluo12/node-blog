<template>
  <el-row class="header">
    <el-col :span="20">
      <router-link to="/" tag="div" style="cursor:pointer">欢迎来到博客</router-link>
    </el-col>
    <el-col :span="4" class="user">
      <div v-if="login">
        <i class="el-icon-user"></i>
        <span class="username">欢迎：{{ username }}</span>
        <i class="el-icon-switch-button" @click="handleLogout"></i>
      </div>
      <div v-else>
        <router-link to="/login">
          <el-button>登录</el-button>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState(["login", "username"])
  },
  methods: {
    handleLogout() {
      this.changeLoginStatus({
        login: false,
        username: ""
      });
      this.$router.push("/");
    },
    ...mapMutations(["changeLoginStatus"])
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

.el-icon-switch-button {
  cursor: pointer;
}
</style>
