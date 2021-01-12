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
          <el-button type="primary" @click="resetC">重置</el-button>
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
          show-summary
          :summary-method="getSummaries"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          ref="table"
        >
          <el-table-column prop="skssq" label="税款所属期"> </el-table-column>
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
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="所得项目：">
                <el-input placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型：">
                <el-select placeholder="证件类型" v-model="IdType">
                  <el-option label="请选择"></el-option>
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
              :show-summary='showSummary'
              border
              style="width: 100%"
              height="400px"
            >
              <el-table-column fixed="left" prop="id" label="序号">
              </el-table-column>
              <el-table-column fixed="left" prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="idType" label="身份证类型" width="100px">
              </el-table-column>
              <el-table-column prop="idCode" label="身份证号码">
              </el-table-column>
              <el-table-column prop="idCode2" label="纳税人识别号">
              </el-table-column>
              <el-table-column prop="sfjmgr" label="是否为非居民个人">
              </el-table-column>
              <el-table-column prop="sdxm" label="所得项目"> </el-table-column>
              <el-table-column prop="bqsr" label="本期收入"> </el-table-column>
              <el-table-column prop="bqfy" label="本期费用"> </el-table-column>
              <el-table-column prop="bqmssr" label="本期免税收入">
              </el-table-column>
              <el-table-column prop="bqjcfy" label="本期减除费用">
              </el-table-column>
              <el-table-column prop="bqjbylbxf" label="本期基本养老保险费">
              </el-table-column>
              <el-table-column prop="bqjbylbxf2" label="本期基本医疗保险费">
              </el-table-column>
              <el-table-column prop="bqsybxf" label="本期失业保险费">
              </el-table-column>
              <el-table-column prop="bqzfgjj" label="本期住房公积金">
              </el-table-column>
              <el-table-column prop="bqnj" label="本期年金"> </el-table-column>
              <el-table-column prop="bqsyjkbx" label="本期商业健康保险">
              </el-table-column>
              <el-table-column prop="bqsyylbx" label="本期税延养老保险">
              </el-table-column>
              <el-table-column prop="bqccyz" label="本期财产原值">
              </el-table-column>
              <el-table-column prop="bqyxkcsj" label="本期允许扣除的税费">
              </el-table-column>
              <el-table-column prop="bqqt" label="本期其他">
                300
              </el-table-column>
              <el-table-column prop="ljsre" label="累计收入额">
                工资*月份
              </el-table-column>
              <el-table-column prop="ljjcfy" label="累计减除费用">
                300*月份
              </el-table-column>
              <el-table-column prop="ljzxkc" label="累计专项扣除">
              </el-table-column>
              <el-table-column prop="ljznjy" label="累计子女教育">
              </el-table-column>
              <el-table-column prop="ljsylr" label="累计赡养老人">
              </el-table-column>
              <el-table-column prop="ljzfdklx" label="累计住房贷款利息">
              </el-table-column>
              <el-table-column prop="ljzfzj" label="累计住房租金">
              </el-table-column>
              <el-table-column prop="ljjxjy" label="累计继续教育">
              </el-table-column>
              <el-table-column prop="ljqtkc" label="累计其他扣除">
                300*月份
              </el-table-column>
              <el-table-column prop="jajsbl" label="减按计税比例">
              </el-table-column>
              <el-table-column prop="zykcjze" label="准予扣除的捐赠额">
              </el-table-column>
              <el-table-column prop="ynssde" label="应纳税所得额">
              </el-table-column>
              <el-table-column prop="slykl" label="税率/预扣率">
              </el-table-column>
              <el-table-column prop="sskcs" label="速算扣除数">
              </el-table-column>
              <el-table-column prop="ynse" label="应纳税额"> </el-table-column>
              <el-table-column prop="jmse" label="减免税额"> </el-table-column>
              <el-table-column prop="yjse" label="已缴税额"> </el-table-column>
              <el-table-column prop="ybtse" label="应退补税额">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { data1, data2, data3 } from "../../js/dateMsg";
export default {
  name: "Company",
  data() {
    return {
      date: "",
      centerDialogVisible: false,
      tableData:[],
      showSummary:false,
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
      ],
      dialogTData: [],
      IdType: "",
      name: "",
      dataCollection: {},
    };
  },
  components: {},
  created() {
    this.dataCollection = { data1: data1, data2, data3 };
    console.log(this.dataCollection);
  },
  methods: {
    onSubmit() {  //我是查询单位的月份
      console.log(this.date)
      console.log(this.date[0])
      console.log(this.date[1])
      let a = this.date[0].substring(5)
      let b = this.date[1].substring(5)
      console.log(a-1,b-1)
      console.log(this.tableDataMM[a-1])
      console.log(this.tableDataMM.slice(a-1,b))
      if(a===b){
        this.tableData = this.tableDataMM[a-1]
      }else{
        this.tableData = this.tableDataMM.slice(a-1,b)
      }
      this.showSummary = true
      
     this.$nextTick(() => {
        this.$refs['table'].doLayout();
     }) 
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
      // let data4Msg = {'ljsre':data1.bqsr*4,'bqqt':300,ljjcfy:300*4,ljqtkc:300*4}
      // let data5Msg = {'ljsre':data1.bqsr*5,'bqqt':300,ljjcfy:300*5,ljqtkc:300*5}
      // let data6Msg = {'ljsre':data1.bqsr*6,'bqqt':300,ljjcfy:300*6,ljqtkc:300*6}
      // let data7Msg = {'ljsre':data1.bqsr*7,'bqqt':300,ljjcfy:300*7,ljqtkc:300*7}
      // let data8Msg = {'ljsre':data1.bqsr*8,'bqqt':300,ljjcfy:300*8,ljqtkc:300*8}
      // let data9Msg = {'ljsre':data1.bqsr*9,'bqqt':300,ljjcfy:300*9,ljqtkc:300*9}
      // let data10Msg = {'ljsre':data1.bqsr*10,'bqqt':300,ljjcfy:300*10,ljqtkc:300*10}
      // let data11Msg = {'ljsre':data1.bqsr*11,'bqqt':300,ljjcfy:300*11,ljqtkc:300*11}
      // let data12Msg = {'ljsre':data1.bqsr*12,'bqqt':300,ljjcfy:300*12,ljqtkc:300*12}
      data1.assign(data1, data1Msg);
    },
    exportC() {},
    exportProve() {},
    handleAction(date, msg) {
      console.log(1111);
      let num = (date - 1) / 2 + 1; //获取正确的月份
      console.log(num);
      console.log(`data${num}`);
      console.log(date);
      console.log(msg);
      this.centerDialogVisible = true;
      console.log(this.dataCollection);
      this.dialogTData = this.dataCollection[`data${num}`];
    },
    search() {
      console.log("这是查询");
      console.log(this.name);
      console.log(this.dialogTData);
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
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
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
          // sums[index] += " 元";
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
      height: 60px;
      line-height: 60px;
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
        background: #e6e6e6;
        border: 1px solid #dddddd;
        padding: 10px 0;
        overflow: hidden;
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
