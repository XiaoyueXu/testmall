<template>
  <div class="jtllList">
    <Card :bordered="false" :shadow="true" style="height: 140px">
      <div class="page-header-title">
        交通流量统计
      </div>
      <br>
      <Form :model="searchConditions.filter" :rules="ruleValidate" ref="searchConditions" inline>
            <FormItem prop="position">
              <Select  placeholder="报表类型" v-model="position" style="width: 100px">
                <Option value="1">日报表</Option>
                <Option value="2">周报表</Option>
                <Option value="3">月报表</Option>
                <Option value="4">自定义</Option>
              </Select>
            </FormItem>
            <FormItem  prop="choseDate" v-if="!isCustom">
              <DatePicker  placeholder="统计时间"  :value="choseDate" @on-change="choseDate=$event" format="yyyy-MM-dd"
                           style="width: 150px;" transfer type="datetime" :editable="false" :clearable="false"></DatePicker>
            </FormItem>
            <FormItem prop="selectTime">
              <DatePicker :disabled="!isCustom" placeholder="起始时间"  type="datetimerange" :value="selectTime" @on-change="selectTime=$event"
                          @on-clear="selectTime=[]" format="yyyy-MM-dd HH:mm:ss" style="width: 350px" :editable="false"  :clearable="false"></DatePicker>
            </FormItem>
            <FormItem prop="cdbh">
              <Select placeholder="车道" style="width: 100px" transfer clearable v-model="searchConditions.filter.cdbh">
                <Option value="1">1车道</Option>
                <Option value="2">2车道</Option>
                <Option value="3">3车道</Option>
                <Option value="4">4车道</Option>
                <Option value="5">5车道</Option>
                <Option value="6">6车道</Option>
              </Select>
            </FormItem>
            <FormItem prop="carType">
              <Select placeholder="车辆类型" style="width: 100px" clearable v-model="searchConditions.filter.carType">
                <Option value="K31">小型车</Option>
                <Option value="K11">大型车</Option>
                <Option value="X99">其他</Option>
              </Select>
            </FormItem>
            <FormItem   prop="deviceId" >
              <Select  placeholder="卡口/路口" clearable multiple style="width: 600px"
                       :max-tag-count="5" :max-tag-placeholder="maxTagPlaceholder" transfer
                       filterable  remote  :remote-method="remoteMethod" :loading="loading"
                       v-model="searchConditions.filter.deviceId">
                <Option :key="index" :value="item.id" v-for="(item,index) in kaKouList">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem style="margin-left: 10px">
              <Button @click="handleSubmit('searchConditions')"  type="primary">查询</Button>
            </FormItem>
      </Form>
    </Card>
    <div class="page-content-body">
      <Tabs>
        <TabPane icon="md-trending-up" label="曲线图">
          <div class="tab-content" id="curveGragh" style="width: 1800px;height:500px;">
          </div>
        </TabPane>
        <TabPane icon="md-stats" label="柱状图">
          <div class="tab-content" id="columnGragh" style="width: 1800px;height:500px;">
          </div>
        </TabPane>
        <TabPane label="报表">
          <div class="page-table-frame" id="reportForm" style="width: 1850px;">
            <Table :columns="columns1" :data="initTable2" @on-row-click="handleRowChange"
                   @on-selection-change="selsChange" ref="selection" size="small" stripe>
            </Table>
            <Page class="page-table-pager" :pageSize="searchConditions.limit" :total="total" @on-change="changPage"
                  @on-page-size-change="changeSize" show-elevator show-total style="margin-top: 10px"></Page>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';

  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  };

  export default {
    data() {
      const validateSelectTime = (rule, value, callback) => {
        if (!this.searchConditions.filter.selectTime[0] ||!this.searchConditions.filter.selectTime[1]) {
          callback(new Error('请选择起始时间 '));
        }
        callback();
      };
      return {
        loading: false,
        options: [],
        //报表类型
        position: "1",
        isCustom:false,//报表类型是否为自定义
        //统计日期
        choseDate: "",
        searchConditions: {
          limit: 20,
          offset: 0,
          filter: {
            // startTime: "",
            // endTime: "",
            //开始、结束时间
            selectTime:[],
            //车道
            cdbh: "0",
            //车辆类型
            carType: "",
            deviceId: [],
          }
        },
        ruleValidate: {
          selectTime: [
            {validator: validateSelectTime, trigger: 'change'},
          ],
          deviceId: [
            {type: 'array', required: true, message: '请选择卡口/路口', trigger: 'change'}
          ],
        },
        sels: [], //列表选中列
        initTable1: [
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          },
          {
            'crossing':"abc",
            'count':"123",
          }
        ],
        initTable2: [],
        total: 0,
        typeList: [],
        arrID: [],
        columns1: [
          {
            key: "crossing",
            title: "卡口/路口"
          }, {
            key: "count",
            title: "过车数量（辆）"
          }
        ],
        kaKouList: [],
      }
    },
    components: {},
    computed:{
      selectTime:{
        get: function() {
          return this.searchConditions.filter.selectTime;
        },
        set: function(newValue) {
          this.searchConditions.filter.selectTime = newValue;
        }
      }
    },
    watch: {
      position:function(type){
       this.setTime(type);
      },
      choseDate:function(){
        this.setTime(this.position);
      }
    },
    mounted() {
      this.getLukou();
      this.initData();

      /* this.makeColumn();
       this.makeLine();*/

      this.renderTable();
    },
    methods: {
      //远程搜索方法
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            const list = this.kaKouList.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            });
            this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options = [];
        }
      },

      maxTagPlaceholder (num) {
        return '更多 '+ num+'...';
      /*  return '...';*/
      },
      checkTime(i) {
        if (i < 10) {
          i = "0" + i
        }
        return i
      },
      //根据报表类型更改时间
      setTime(type){
        let choseTime = new Date((new Date(this.choseDate)).getTime());
        let startTime;
        let endTime;
        switch (type) {
          //日报表
          case "1":
            this.isCustom = false;
            startTime = this.choseDate + " " + "00:00:00";
            endTime = this.choseDate + " " + "23:59:59";
            break;
          //周报表
          case "2":
            this.isCustom = false;
            startTime = this.getDayOfWeek(choseTime,1) + " " + "00:00:00";
            endTime = this.getDayOfWeek(choseTime,7) + " " + "23:59:59";
            break;
          //月报表
          case "3":
            this.isCustom = false;
            startTime = this.getCurrentMonthFirst(choseTime) + " " + "00:00:00";
            endTime = this.getCurrentMonthLast(choseTime) + " " + "23:59:59";
            break;
          //自定义
          case "4":
            this.isCustom = true;
            let date = new Date();
            let choseDate = date.getFullYear() + "-" + this.checkTime((date.getMonth() + 1))
              + "-" + this.checkTime(date.getDate());
            startTime = choseDate + " " + "00:00:00";
            endTime = choseDate + " "  + "23:59:59";
            break;
        }
        this.selectTime = [startTime,endTime];
      },

      //获取当前周某一天
      getDayOfWeek(date, dayofweek) {
        let f = date;
        let day = date.getDay();
        let week = "1234560";
        let first = (dayofweek - 1) - week.indexOf(day);
        f.setDate(f.getDate() + first);
        return f.format("yyyy-MM-dd");
      },
      //获取当前月第一天
      getCurrentMonthFirst(date) {
        date.setDate(1);
        return date.format("yyyy-MM-dd");
      },
      //获取当前月最后一天
      getCurrentMonthLast(date) {
        let currentMonth = date.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay).format("yyyy-MM-dd");
      },

      initData() {
        let date = new Date();
        let choseDate = date.getFullYear() + "-" + this.checkTime((date.getMonth() + 1))
                          + "-" + this.checkTime(date.getDate());
        let startTime = choseDate + " " + "00:00:00";
        let endTime = choseDate + " "  + "23:59:59";
        //this.choseDate+" "+this.checkTime(date.getHours()) + ':' + this.checkTime(date.getMinutes());
        this.selectTime = [startTime,endTime];
        this.choseDate = choseDate;
      },
      getLukou() {
        this.$http({
          url: "/zuul/ops/layer?modelId=00010003",
          type: "get"
        }).then(result => {
          if (result.data) {
            let res = result.data.data;
            for (var i in res) {
              this.kaKouList.push(
                {
                  "id": res[i].deviceId == null ? "" : res[i].deviceId,
                  "name": res[i].name == null ? "" : res[i].name
                }
              )
            }
          }
        });
      },
      changPage(index) {
        // this.searchConditions.offset = (index - 1) * this.searchConditions.limit;
        /* console.log("index:"+index);*/
        this.searchConditions.offset = (index - 1);
        this.renderTable();
      },
      changeSize(size) {
        this.searchConditions.limit = size;
        this.renderTable();
      },
      handleSubmit(name) {
       /* this.total = 21;
        this.renderTable();
        this.makeColumn();
        this.makeLine();*/
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url: "/zuul/trafficflow/LDWS/V1/trace/countTrafficFlow",
              method: "get",
              params: {
                "crossingIndexs": this.searchConditions.filter.deviceId.toString(),
                "beginTime": this.selectTime[0],
                "endTime": this.selectTime[1],
                //车辆类型
                "vehicleType": this.searchConditions.filter.carType,
                //车道
                "laneNo": this.searchConditions.filter.cdbh,
              }
            }).then(result => {
              console.log(result);
              if (result.status == "200") {
                let res = result.data.data;
                console.log(result);
                this.initTable1 = [];
                for (let i in res) {
                  this.initTable1.push(
                    {
                      "crossing": this.crossingIndexFormatter(res[i].crossingIndex),
                      "count": res[i].countValue,
                      /* "color": "#7cb5ec"*/
                    }
                  )
                }
                this.total = res.length;
                this.renderTable();
                this.makeColumn();
                this.makeLine();
              }
            });
          } else {
            // this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      cancel() {
      },
      //单击某一行时触发
      handleRowChange(row, event, column) {
        var same = false;
        if (this.arrID.length > 0) {
          for (var i = 0; i < this.arrID.length; i++) {
            if (this.arrID[i] == row.id) {
              same = true;
              break;
            }
          }
          if (same == true) {
          } else {
            this.arrID.push(row.id);
          }
        } else {
          this.arrID.push(row.id);
        }
        console.log("click" + this.arrID);
      },
      //选中项发生变化时触发
      selsChange(sels) {
        //console.log(sels);
        this.sels = sels;
        if (sels.length > 0) {
          var valId = [];
          for (var i = 0; i < sels.length; i++) {
            var arrIDsame = false;
            valId.push(sels[i].id);
          }
          this.arrID = valId;
        }
        console.log("change" + this.arrID);
      },
      renderTable() {
        this.initTable2 = this.initTable1.slice(this.searchConditions.limit
          * this.searchConditions.offset, this.searchConditions.limit
          * (this.searchConditions.offset + 1));
        this.total = this.initTable1.length;
      },
      makeColumn() {
        let xArr = [];
        let dataArr = [];
        //let legendArr = []
        for (let i in this.initTable1) {
          xArr.push(this.initTable1[i].crossing)
          dataArr.push(this.initTable1[i].count)
        }

        let option = {
          title: {
            left: 'center',
            fontSize: 24,
            text: '交通流量统计',
            //subtext: '红色代表',
          },
          color: ['#87badb'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: "123",
            top: "2%",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
            right: "10%",                               //组件离容器右侧的距离,'20%'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name:"卡口/路口",
              type: 'category',
              data: xArr,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel:{
                interval:0,
                rotate:30
              }
            }
          ],
          yAxis: [
            {
              name:"单位（辆）",
              type: 'value'
            }
          ],
          series: [
            {
              //name: legendArr[0],
              type: 'bar',
              barWidth: '60%',
              data: dataArr
            }
          ]
        };

        let columnGragh = echarts.init(document.getElementById('columnGragh'));
        columnGragh.setOption(option);
      },
      makeLine() {
        let xArr = [];
        let dataArr = [];
        //let legendArr = []
        for (let i in this.initTable1) {
          xArr.push(this.initTable1[i].crossing)
          dataArr.push(this.initTable1[i].count)
        }

        let option = {
          title: {
            left: 'center',
            fontSize: 24,
            text: '交通流量统计',
            //subtext: '红色代表',
          },
          color: ['#87badb'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: "123",
            top: "2%",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
            right: "10%",                               //组件离容器右侧的距离,'20%'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name:"卡口/路口",
              type: 'category',
              data: xArr,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel:{
                interval:0,
                rotate:30
              }
            }
          ],
          yAxis: [
            {
              name:"单位（辆）",
              type: 'value'
            }
          ],
          series: [
            {
              //name: legendArr[0],
              type: 'line',
              data: dataArr
            }
          ]
        };

        let curveGragh = echarts.init(document.getElementById('curveGragh'));
        curveGragh.setOption(option);
      },
      crossingIndexFormatter(crossingIndex) {
        let index = (this.kaKouList || []).findIndex((item) => item.id == crossingIndex)
        if (index >= 0) {
          return this.kaKouList[index].name;
        } else {
          return crossingIndex
        }
      }
    }
  }
</script>

<style lang="less" >
  .jtllList .ivu-form-item {
    margin-bottom: 0 !important;
  }

  .jtllList .ivu-input[disabled] {
    background-color: white !important;
    color: black !important;
  }
  /*.ivu-select-default.ivu-select-multiple .ivu-select-selection {*/
  /*  z-index: 99999;*/
  /*}*/
</style>
