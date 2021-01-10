<template>
  <div class="content">
    <header class="system_header">
      <el-breadcrumb separator=">>" class="breadcrumb">
        <el-breadcrumb-item><img class="icon-home" />首页</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <div class="contentC">
      <div class="contentH">
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-between">
          <el-col :span="3">
            <span>
              税款所属声明：
            </span>
          </el-col>
          <el-col :span="5">
            <el-input class="inputT"></el-input>
            <!-- <p>至</p> -->
          </el-col>
          <el-col :span="5">
            <el-input class="inputT"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="resetC">重置</el-button>
            <el-button type="primary" @click="exportC">导出</el-button>
            <el-button type="primary" @click="exportProve"
              >导出完税证明开具</el-button
            >
          </el-col>
        </el-row>
      </div>

      <div>
        <el-table
          border
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          height='300'
          default-expand-all
          show-summary
          :summary-method="getSummaries"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="skssq" label="税款所属期"> </el-table-column>
          <el-table-column prop="sbrc" label="申报人次"> </el-table-column>
          <el-table-column prop="dqsr" label="当期收入"> </el-table-column>
          <el-table-column prop="ybse" label="应补（退）税额" width="180">
          </el-table-column>
          <el-table-column prop="sblx" label="申报类型"> </el-table-column>
          <el-table-column prop="sbqd" label="申报渠道"> </el-table-column>
          <el-table-column prop="sbsj" label="申报时间"> </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
          >
          <template slot-scope="scope">
        <el-button
          @click.native.prevent="handleAction(scope.$index, tableData)"
          type="text"
          size="small">
           {{scope.row.action}}
        </el-button>
      </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Company",
  data() {
    return {
      tableData: [
        {
          id: 1,
          skssq: "2016-05-02",
          sbrc: "王小虎",
          dqsr: "10000",
          ybse: "123",
          sblx: "4323",
          sbqd: "222",
          sbsj: "345",
          sbsj: "ewwrr",
          action: "",
          children: [
            {
              id: 11,
              skssq: "2016-05-02",
              sbrc: "王小虎",
              dqsr: "10000",
              ybse: "123",
              sblx: "4323",
              sbqd: "222",
              sbsj: "345",
              sbsj: "ewwrr",
              action: "查看明细",
          //     render: (h, scope) => {
          //   return (
          //     <div>
          //        <el-link type="primary" onClick={()=>{this.fileBag(scope)}}>打开办件</el-link>
          //     </div>
          //   )
          // }
            },
          ],
        },
          {
          id: 2,
          skssq: "2016-05-02",
          sbrc: "王小虎",
          dqsr: "10000",
          ybse: "123",
          sblx: "4323",
          sbqd: "222",
          sbsj: "345",
          sbsj: "ewwrr",
          action: "",
          children: [
            {
              id: 21,
              skssq: "2016-05-02",
              sbrc: "王小虎",
              dqsr: "10000",
              ybse: "123",
              sblx: "4323",
              sbqd: "222",
              sbsj: "345",
              sbsj: "ewwrr",
              action: "查看明细",
          //     render: (h, scope) => {
          //   return (
          //     <div>
          //        <el-link type="primary" onClick={()=>{this.fileBag(scope)}}>打开办件</el-link>
          //     </div>
          //   )
          // }
            },
          ],
        },
          {
          id: 3,
          skssq: "2016-05-02",
          sbrc: "王小虎",
          dqsr: "10000",
          ybse: "123",
          sblx: "4323",
          sbqd: "222",
          sbsj: "345",
          sbsj: "ewwrr",
          action: "",
          children: [
            {
              id: 31,
              skssq: "2016-05-02",
              sbrc: "王小虎",
              dqsr: "10000",
              ybse: "123",
              sblx: "4323",
              sbqd: "222",
              sbsj: "345",
              sbsj: "ewwrr",
              action: "查看明细",
          //     render: (h, scope) => {
          //   return (
          //     <div>
          //        <el-link type="primary" onClick={()=>{this.fileBag(scope)}}>打开办件</el-link>
          //     </div>
          //   )
          // }
            },
          ],
        },
          {
          id: 4,
          skssq: "2016-05-02",
          sbrc: "王小虎",
          dqsr: "10000",
          ybse: "123",
          sblx: "4323",
          sbqd: "222",
          sbsj: "345",
          sbsj: "ewwrr",
          action: "",
          children: [
            {
              id: 41,
              skssq: "2016-05-02",
              sbrc: "王小虎",
              dqsr: "10000",
              ybse: "123",
              sblx: "4323",
              sbqd: "222",
              sbsj: "345",
              sbsj: "ewwrr",
              action: "查看明细",
          //     render: (h, scope) => {
          //   return (
          //     <div>
          //        <el-link type="primary" onClick={()=>{this.fileBag(scope)}}>打开办件</el-link>
          //     </div>
          //   )
          // }
            },
          ],
        },
          {
          id: 5,
          skssq: "2016-05-02",
          sbrc: "王小虎",
          dqsr: "10000",
          ybse: "123",
          sblx: "4323",
          sbqd: "222",
          sbsj: "345",
          sbsj: "ewwrr",
          action: "",
          children: [
            {
              id: 51,
              skssq: "2016-05-02",
              sbrc: "王小虎",
              dqsr: "10000",
              ybse: "123",
              sblx: "4323",
              sbqd: "222",
              sbsj: "345",
              sbsj: "ewwrr",
              action: "查看明细",
          //     render: (h, scope) => {
          //   return (
          //     <div>
          //        <el-link type="primary" onClick={()=>{this.fileBag(scope)}}>打开办件</el-link>
          //     </div>
          //   )
          // }
            },
          ],
        },
      ],
    };
  },
  components: {

  },
  methods: {
    onSubmit() {},
    resetC() {},
    exportC() {},
    exportProve() {},
    handleAction(date, msg) {
      console.log(date);
      console.log(msg);
    },
    getSummaries(param){  //合计
    const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  .system_header {
    height: 32px;
    background: #fff;
    padding-left: 10px;
    border-bottom: 1px solid #e6e6e6;
    .breadcrumb {
      width: 100%;
      height: 32px;
      line-height: 32px;
      /deep/.el-breadcrumb__inner {
        color: #409eff;
      }
      .icon-home {
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
  .contentC {
    margin: 20px;
    .contentH {
      border: 1px solid #dddddd;
    }
  }
}
</style>
