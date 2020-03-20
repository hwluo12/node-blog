<template>
  <div class="about">
    <h1 class="title">{{ detail.title }}</h1>
    <div class="createtime">
      作者: {{ detail.author }} &nbsp;&nbsp;&nbsp;&nbsp;日期：{{
        detail.createtime
      }}
    </div>
    <div class="content">{{ detail.content }}</div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "About",
  data() {
    return {
      detail: {
        title: "",
        content: "",
        createtime: 0
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios
        .get("/api/blog/detail?id=" + this.$route.query.id)
        .then(this.getDetailSucc);
    },
    getDetailSucc(res) {
      const data = res.data;
      if (data && data.errno === 0) {
        data.data.createtime = moment(data.data.createtime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.detail = data.data;
        console.log(this.detail);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.title {
  margin-bottom: 8px;
}

.createtime {
  font-size: 14px;
}

.content {
  margin-top: 12px;
}
</style>
