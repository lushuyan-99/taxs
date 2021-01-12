<template>
  <div class="content">
    <header class="system_header">
      <el-breadcrumb separator=">>" class="breadcrumb">
        <el-breadcrumb-item><img class="icon-home" />首页</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <div class="contentC">
      <div class="contentH">
        <div class="left">
          <span class="mark">*</span>
          <span>税款所属声明：</span>
          <el-date-picker
            v-model="date"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            format="yyyy-MM"
            value-format="yyyy-M"
          >
          </el-date-picker>
        </div>
        <div class="right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button  @click="resetC" type="primary" plain>重置</el-button>
          <el-button type="primary" @click="exportC">导出</el-button>
          <el-button type="primary" @click="exportProve"
            >导出完税证明开具</el-button
          >
        </div>
      </div>
      <div>
        <el-table
          border
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          height="300"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          ref="table"
          :header-cell-style="{background:'#F4F6F9'}"
        >
        <!--  show-summary
          :summary-method="getSummaries"  -->
          <el-table-column prop="skssq" label="税款所属期" width="180px"> </el-table-column>
          <el-table-column prop="sbrc" label="申报人次"> </el-table-column>
          <el-table-column prop="dqsr" label="当期收入"> </el-table-column>
          <el-table-column prop="ybse" label="应补（退）税额" width="180">
          </el-table-column>
          <el-table-column prop="sblx" label="申报类型"> </el-table-column>
          <el-table-column prop="sbqd" label="申报渠道"> </el-table-column>
          <el-table-column prop="sbsj" label="申报时间"> </el-table-column>
          <el-table-column prop="action" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handleAction(scope.$index, tableData)"
                type="text"
                size="small"
              >
                {{ scope.row.action }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="90%"
      height="500px"
      center
    >
      <div class="dialogC">
        <div class="dialog-Cheader">
          <span>
            2021年01月个人个人所得税扣缴申报表
          </span>
          <p>(综合所得预扣预缴表)</p>
        </div>
        <div class="dialogC-top">
          <span class="dialogC-btn">
            <el-button>导出</el-button>
            <el-button class="btn-right">收折查询条件</el-button>
          </span>
          <div class="dialogC-Content">
            <el-form :inline="true" class="demo-form-inline" style="display: flex;">
              <el-form-item label="所得项目：">
                <el-input placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型：">
                <el-select placeholder="证件类型" v-model="IdType">
                  <el-option label="请选择" value="11"></el-option>
                  <el-option label="居民身份证" value="jmsfz"></el-option>
                  <el-option label="中国护照" value="zghz"></el-option>
                  <el-option
                    label="港澳居民来往内地居民通行证"
                    value="gajmtxz"
                  ></el-option>
                  <el-option
                    label="台湾居民来往大陆居民通行证"
                    value="twjmtxz"
                  ></el-option>
                  <el-option
                    label="中华人民共和国港澳居民通行证"
                    value="zggatxz"
                  ></el-option>
                  <el-option
                    label="中华人民共和国台湾居民通行证"
                    value="zgtwtxz"
                  ></el-option>
                  <el-option label="外国护照" value="wghz"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码：">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <div class="dialogC-bottom">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button class="btn-right">重置</el-button>
            </div>
          </div>
          <div class="dialogC-table">
            <el-table
              :data="dialogTData"
              show-summary
              :summary-method="getSummaries2"
              border
              style="width: 100%"
              height="400px"
             :header-cell-style="{background:'#F4F6F9'}"
            >
              <el-table-column
                v-for="column in dialogColumns"
                :prop="column.dataIndex"
                :label="column.title"
                sortable="custom"
                :key="column.field"
                :width="column.width"
              >
              </el-table-column>            
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
} from "../../js/dateMsg";
export default {
  name: "Company",
  data() {
    return {
      date: "",
      centerDialogVisible: false,
      tableData: [],
      showSummary: false,
      tableDataMM: [
        {
          id: 1,
          skssq: "2020年1月",
          sbrc: 201,
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 11,
              skssq: "2020年1月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-02-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 2,
          skssq: "2020年2月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 21,
              skssq: "2020年2月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-02-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 3,
          skssq: "2020年3月",
          sbrc: "190",
          dqsr: "903024.55",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 31,
              skssq: "2020年3月",
              sbrc: "190",
              dqsr: "903024.55",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-04-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 4,
          skssq: "2020年4月",
          sbrc: "197",
          dqsr: "944757.65",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 41,
              skssq: "2020年4月",
              sbrc: "197",
              dqsr: "944757.65",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-05-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 5,
          skssq: "2020年5月",
          sbrc: "201",
          dqsr: "972427.17",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 51,
              skssq: "2020年5月",
              sbrc: "201",
              dqsr: "972427.17",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-06-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 6,
          skssq: "2020年6月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 61,
              skssq: "2020年6月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-07-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 7,
          skssq: "2020年7月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 71,
              skssq: "2020年7月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-08-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 8,
          skssq: "2020年8月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 81,
              skssq: "2020年8月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-09-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 9,
          skssq: "2020年9月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 91,
              skssq: "2020年9月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-10-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 10,
          skssq: "2020年10月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 101,
              skssq: "2020年10月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-11-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 11,
          skssq: "2020年11月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 111,
              skssq: "2020年11月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2020-12-25",
              action: "查看明细",
            },
          ],
        },
        {
          id: 12,
          skssq: "2020年12月",
          sbrc: "201",
          dqsr: "980176.33",
          ybse: "0",
          sblx: "--",
          sbqd: "--",
          sbsj: "--",
          action: "",
          children: [
            {
              id: 121,
              skssq: "2020年12月",
              sbrc: "201",
              dqsr: "980176.33",
              ybse: "0",
              sblx: "正常申报",
              sbqd: "客户端",
              sbsj: "2021-01-25",
              action: "查看明细",
            },
          ],
        },
      ],
      dialogTData: [],
      IdType: "",
      name: "",
      dataCollection: {},
      dialogColumns: [],
    };
  },
  components: {},
  created() {
    this.dataCollection = {
      data1: data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12,
    };
    console.log(this.dataCollection);
    this.datachange();
  },
  methods: {
    onSubmit() {
      //我是查询单位的月份
      let a = this.date[0].substring(5);
      let b = this.date[1].substring(5);
      if (a === b) {
        this.tableData = this.tableDataMM[a - 1];
      } else {
        this.tableData = this.tableDataMM.slice(a - 1, b);
      }
      this.showSummary = true;
      this.$nextTick(() => {
        this.$refs["table"].doLayout();
      });
    },
    resetC() {
      console.log(111);
      const yy = [1, 7];
      const mmm = function(arry) {
        let array = arry;
        let len = array.length;
        let aa = len - 1;
        if (array[len - aa] - array[0] > 1) {
          let bb = array[len - aa] - 1;
          array.splice(1, 0, bb);
          mmm(array);
        }
        return array;
      };
      console.log(mmm(yy));
    },
    datachange() {
      let data1Msg = {
        ljsre: data1.bqsr * 1,
        bqqt: 300,
        ljjcfy: 300 * 1,
        ljqtkc: 300 * 1,
      };
      let data2Msg = {
        ljsre: data2.bqsr * 2,
        bqqt: 300,
        ljjcfy: 300 * 2,
        ljqtkc: 300 * 2,
      };
      let data3Msg = {
        ljsre: data3.bqsr * 3,
        bqqt: 300,
        ljjcfy: 300 * 3,
        ljqtkc: 300 * 3,
      };
      let data4Msg = {
        ljsre: data1.bqsr * 4,
        bqqt: 300,
        ljjcfy: 300 * 4,
        ljqtkc: 300 * 4,
      };
      let data5Msg = {
        ljsre: data1.bqsr * 5,
        bqqt: 300,
        ljjcfy: 300 * 5,
        ljqtkc: 300 * 5,
      };
      let data6Msg = {
        ljsre: data1.bqsr * 6,
        bqqt: 300,
        ljjcfy: 300 * 6,
        ljqtkc: 300 * 6,
      };
      let data7Msg = {
        ljsre: data1.bqsr * 7,
        bqqt: 300,
        ljjcfy: 300 * 7,
        ljqtkc: 300 * 7,
      };
      let data8Msg = {
        ljsre: data1.bqsr * 8,
        bqqt: 300,
        ljjcfy: 300 * 8,
        ljqtkc: 300 * 8,
      };
      let data9Msg = {
        ljsre: data1.bqsr * 9,
        bqqt: 300,
        ljjcfy: 300 * 9,
        ljqtkc: 300 * 9,
      };
      let data10Msg = {
        ljsre: data1.bqsr * 10,
        bqqt: 300,
        ljjcfy: 300 * 10,
        ljqtkc: 300 * 10,
      };
      let data11Msg = {
        ljsre: data1.bqsr * 11,
        bqqt: 300,
        ljjcfy: 300 * 11,
        ljqtkc: 300 * 11,
      };
      let data12Msg = {
        ljsre: data1.bqsr * 12,
        bqqt: 300,
        ljjcfy: 300 * 12,
        ljqtkc: 300 * 12,
      };
      data1.assign(data1, data1Msg);
      data2.assign(data2, data2Msg);
      data3.assign(data3, data3Msg);
      data4.assign(data4, data4Msg);
      data5.assign(data5, data5Msg);
      data6.assign(data6, data6Msg);
      data7.assign(data7, data7Msg);
      data8.assign(data8, data8Msg);
      data9.assign(data9, data9Msg);
      data10.assign(data10, data10Msg);
      data11.assign(data11, data11Msg);
      data12.assign(data12, data12Msg);
    },
    exportC() {},
    exportProve() {},
    handleAction(date, msg) {
      console.log(1111);
      let num = (date - 1) / 2 + 1; //获取正确的月份
      this.centerDialogVisible = true;
      let arry = [
        {
          dataIndex: "id",
          title: "序号",
          width: 80,
        },
        {
          dataIndex: "name",
          title: "姓名",
          width: 80,
        },
        {
          dataIndex: "idType",
          title: "身份证类型",
          width: 120,
        },
        {
          dataIndex: "idCode",
          title: "身份证号码",
          width: 180,
        },
        {
          dataIndex: "idCode2",
          title: "纳税人识别号",
          width: 180,
        },
        {
          dataIndex: "sfjmgr",
          title: "是否为非居民个人",
          width: 180,
        },
        {
          dataIndex: "sdxm",
          title: "所得项目",
          width: 160,
        },
        {
          dataIndex: "bqsr",
          title: "本期收入",
          width: 200,
        },
        {
          dataIndex: "bqfy",
          title: "本期费用",
          width: 120,
        },
        {
          dataIndex: "bqmssr",
          title: "本期免税收入",
          width: 140,
        },
        {
          dataIndex: "bqjcfy",
          title: "本期减除费用",
          width: 140,
        },
        {
          dataIndex: "bqjbylbxf",
          title: "本期基本养老保险费",
          width: 200,
        },
        {
          dataIndex: "bqjbylbxf2",
          title: "本期基本医疗保险费",
          width: 200,
        },
        {
          dataIndex: "bqsybxf",
          title: "本期失业保险费",
          width: 200,
        },
        {
          dataIndex: "bqzfgjj",
          title: "本期住房公积金",
          width: 200,
        },
        {
          dataIndex: "bqnj",
          title: "本期年金",
          width: 100,
        },
        {
          dataIndex: "bqsyjkbx",
          title: "本期商业健康保险",
          width: 200,
        },
        {
          dataIndex: "bqccyz",
          title: "本期税延养老保险",
          width: 200,
        },
        {
          dataIndex: "bqsyylbx",
          title: "本期财产原值",
          width: 200,
        },
        {
          dataIndex: "bqyxkcsj",
          title: "本期允许扣除的税费",
          width: 210,
        },
        {
          dataIndex: "bqqt",
          title: "本期其他",
          width: 120,
        },
        {
          dataIndex: "ljsre",
          title: "累计收入额",
          width: 200,
        },
        {
          dataIndex: "ljjcfy",
          title: "累计减除费用",
          width: 140,
        },
        {
          dataIndex: "ljzxkc",
          title: "累计专项扣除",
          width: 200,
        },
        {
          dataIndex: "ljznjy",
          title: "累计子女教育",
          width: 160,
        },
        {
          dataIndex: "ljsylr",
          title: "累计赡养老人",
          width: 160,
        },
        {
          dataIndex: "ljzfdklx",
          title: "累计住房贷款利息",
          width: 200,
        },
        {
          dataIndex: "ljzfzj",
          title: "累计住房租金",
          width: 140,
        },
        {
          dataIndex: "ljjxjy",
          title: "累计继续教育",
          width: 180,
        },
        {
          dataIndex: "ljqtkc",
          title: "累计其他扣除",
          width: 180,
        },
        {
          dataIndex: "jajsbl",
          title: "减按计税比例",
          width: 180,
        },
        {
          dataIndex: "ynssde",
          title: "应纳税所得额",
          width: 180,
        },
        {
          dataIndex: "slykl",
          title: "税率/预扣率",
          width: 170,
        },
        {
          dataIndex: "sskcs",
          title: "速算扣除数",
          width: 130,
        },
        {
          dataIndex: "ynse",
          title: "应纳税额",
          width: 100,
        },
        {
          dataIndex: "jmse",
          title: "减免税额",
          width: 100,
        },
        {
          dataIndex: "yjse",
          title: "已缴税额",
          width: 100,
        },
        {
          dataIndex: "ybtse",
          title: "应退补税额",
          width: 120,
        },
      ];
      this.dialogColumns = arry;
      this.dialogTData = this.dataCollection[`data${num}`];
    },
    search() {
      this.dialogTData.forEach((v) => {
        if (v.name === this.name) {
          console.log(v);
          this.dialogTData = [v];
        }
      });
    },
    getSummaries(param) {
      //合计
      const { columns, data } = param;
      console.log(columns);
      const sums = [];
      columns.forEach((column, index) => {       
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = '--'
        } else {
          sums[index] = "--";
        }
      });

      return sums;
    },
    getSummaries2(param) {
      console.log(1111)
      //合计
      const { columns, data } = param;
      console.log(columns);
      const sums = [];
      columns.forEach((column, index) => {   
        if(index===0){
         sums[index] = '合计'
         return
        }else if(index===3||index==4){
           sums[index] = '--'
           return
        }   
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "--";
        }
      });

      return sums;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  /deep/.el-button{
        height: 28px !important;
    line-height: 28px !important;
    padding: 0 6px;
  }
  /deep/.el-form--inline .el-form-item{
    display: flex;
  }
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
      // border: 1px solid #ffff;
      background-color: #ffff;
      height: 57px;
      line-height: 57px;
      .left {
        float: left;
        .mark {
          // height: 60px;
          // line-height: 60px;
          color: red;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .right {
        float: right;
      }
    }
  }
  /deep/.el-dialog__header {
    height: 20px !important;
    line-height: 20px !important;
    border-bottom: 1px solid #dddddd !important;
  }
  /deep/.el-dialog--center .el-dialog__body {
    text-align: center !important;
  }
  .dialogC {
    padding: 0 10px;
    .dialog-Cheader {
      span {
        font-size: 20px;
      }
      p {
        margin-top: 10px;
      }
    }
    .dialogC-top {
      margin-top: 10px;
      .dialogC-Content {
        background: #F4F6F9;
        border: 1px solid #dddddd;
        padding: 10px 0;
        height: 85px;
      /deep/  .el-form--inline .el-form-item__label {
          float: none;
          display: inline-block;
          width: 100px!important;}
      }
      .dialogC-btn {
        text-align: right;
        border: 1px solid #dddddd;
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        .btn-right {
          margin-right: 20px;
        }
        // padding-right: 10px;
      }
    }
    .dialogC-bottom {
      float: right;
      .btn-right {
        margin-right: 20px;
      }
    }
  }
}
</style>
