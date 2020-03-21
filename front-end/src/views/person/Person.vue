<template>
  <div>
    <div>
      <el-button type="primary" @click="handleNew" size="mini">新增</el-button>
    </div>
    <div>
      <el-form :inline="true" size="mini">
        <el-form-item label="查询博客：">
          <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" style="width: 600px">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="编辑博客"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :inline="true" size="mini" width="100%">
        <el-form-item label="标题">
          <el-input v-model="row.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="row.content" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增博客"
      :visible.sync="newDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :inline="true" size="mini" width="100%">
        <el-form-item label="标题">
          <el-input v-model="newRow.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="newRow.content"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleNewOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Person",
  computed: {
    ...mapState(["username"])
  },
  data() {
    return {
      tableData: [],
      keyword: "",
      dialogVisible: false,
      newDialogVisible: false,
      row: {},
      newRow: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        methods: "get",
        url: "/api/blog/list",
        params: {
          author: this.username,
          keyword: this.keyword
        }
      }).then(this.getListSucc);
    },
    getListSucc(res) {
      const data = res.data;
      if (data && data.errno === 0) {
        console.log(data.data);
        this.tableData = data.data;
      }
    },
    handleEdit(index, row) {
      this.row = { ...row };
      this.dialogVisible = true;
    },
    handleOk() {
      axios({
        method: "post",
        url: "/api/blog/update",
        params: {
          id: this.row.id
        },
        data: {
          title: this.row.title,
          content: this.row.content
        }
      }).then(res => {
        const data = res.data;
        if (data && data.errno === 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.dialogVisible = false;
          this.getList();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    handleNewOk() {
      axios({
        method: "post",
        url: "/api/blog/new",
        data: {
          title: this.newRow.title,
          content: this.newRow.content
        }
      }).then(res => {
        const data = res.data;
        if (data && data.errno === 0) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.newDialogVisible = false;
          this.getList();
        } else {
          this.$message.error("新增失败");
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            url: "/api/blog/del",
            params: {
              id: row.id
            }
          }).then(res => {
            const data = res.data;
            if (data && data.errno === 0) {
              this.$message({
                message: "删除成功!",
                type: "success"
              });
              this.getList();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onSubmit() {
      this.getList();
      this.keyword = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleNew() {
      this.newRow = {};
      this.newDialogVisible = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.username {
  line-height: 32px;
}
</style>
