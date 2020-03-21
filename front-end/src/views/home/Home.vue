<template>
  <div>
    <div style="width: 300px" v-for="item of formatTimeList" :key="item.id">
      <router-link :to="'/about?id=' + item.id" tag="div" class="title">
        {{
        item.title
        }}
      </router-link>
      <div class="createtime">日期：{{ item.createtime }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Home",
  data() {
    return {
      list: []
    };
  },
  computed: {
    formatTimeList() {
      return this.list.map(item => ({
        createtime: moment(item.createtime).format("YYYY-MM-DD HH:mm:ss"),
        title: item.title,
        id: item.id
      }));
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("/api/blog/list").then(this.getListSucc);
    },
    getListSucc(res) {
      const data = res.data;
      if (data && data.errno === 0) {
        this.list = data.data;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.title {
  font-size: 20px;
  cursor: pointer;
  margin-top: 8px;
}

.createtime {
  font-size: 14px;
}
</style>
