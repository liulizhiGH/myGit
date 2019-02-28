import React, { Component } from "react";
import HeaderCommon from "../common/header";
import FooterCommon from "../common/footer";
import { Button, message, Card } from "antd";
import axios from "../../utils/axiosUtils";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 不同的商品有不同的规格，即计算商品价格方法不通用。待改进，不够动态。此处针对安心付产品购买
      goodsId: "", //商品id
      goodsName: "", //商品名称
      goodsDesc: "", //商品描述
      priceAnormGroup: [], //价格范围
      versionName: "", //规格版本名称
      versionGroup: [], //规格版本
      durationName: "", //购买时长名称
      durationGroup: [], //购买时长
      selectedVersion: "", //选中的规格版本
      selectedDuration: "", //选中的购买时长
      totalPrice: 0 //最终价格
    };
  }
  componentDidMount(e) {
    this.getGooodsStandard();
  }

  // 根据商品id，获取商品具体规格
  getGooodsStandard = () => {
    axios({
      method: "post",
      url: "/commodity/getFormworkItem",
      data: {
        commodityId: this.props.match.params.data
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          // 删除"购买时长"组中的1个月
          let itemContent = JSON.parse(res.data.data.itemContent);
          console.log(itemContent);
          let deleteIndex = "";
          for (
            let i = 0;
            i < itemContent.typeAttribute[1].attibuteValue.length;
            i++
          ) {
            const element = itemContent.typeAttribute[1].attibuteValue[i];
            if (element.value == "1") {
              deleteIndex = i;
            }
          }
          itemContent.typeAttribute[1].attibuteValue.splice(deleteIndex, 1);
          this.setState(
            (state, props) => {
              return {
                goodsId: res.data.data.commodityId || "", //商品id
                goodsName: itemContent.payType || "", //商品名称
                goodsDesc: itemContent.payDesc || "", //商品描述
                priceAnormGroup: itemContent.payPrice.priceAnorm || [], //价格范围
                versionName: itemContent.typeAttribute[0].attibuteName || "", //规格版本名称
                versionGroup: itemContent.typeAttribute[0].attibuteValue || [], //规格版本
                durationName: itemContent.typeAttribute[1].attibuteName || "", //购买时长名称
                durationGroup: itemContent.typeAttribute[1].attibuteValue || "" //购买时长
              };
            },
            () => {
              // 设置完规格，然后初始化最终价格
              console.log(this.state);
              this.initPrice();
            }
          );
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  // 根据商品规格组合，遍历最终价格
  // gooodsStandardStr:商品组合规格字符串
  calcTotalPrice = gooodsStandardStr => {
    console.log(gooodsStandardStr);
    let priceAnormGroup = this.state.priceAnormGroup;
    for (let i = 0; i < priceAnormGroup.length; i++) {
      let element = priceAnormGroup[i];
      // 如果商品选择组合和预定义的组合特征相符，那么最终价格就等于预定价格
      switch (gooodsStandardStr) {
        case element.norm:
          this.setState(
            (state, props) => {
              return {
                totalPrice: element.price
              };
            },
            () => {
              console.log(this.state.totalPrice);
            }
          );
          break;
        default:
          break;
      }
    }
  };

  // 初始化最终价格
  initPrice = () => {
    //  默认选中每组单选框的第一项
    let versionGroup = document.getElementsByName("versionGroup");
    let durationGroup = document.getElementsByName("durationGroup");
    versionGroup[0].setAttribute("checked", true);
    durationGroup[0].setAttribute("checked", true);
    // 获取每组被选中的单选款的value值，并进行拼接字符串，生成商品组合规格字符串
    let strPart1 = "";
    let strPart2 = "";
    for (let i = 0; i < versionGroup.length; i++) {
      if (versionGroup[i].checked == true) {
        strPart1 = versionGroup[i].value;
        this.setState(
          (state, props) => {
            return {
              selectedVersion: versionGroup[i].value //选中的商品规格
            };
          },
          () => {
            console.log(this.state);
          }
        );
      }
    }
    for (let i = 0; i < durationGroup.length; i++) {
      if (durationGroup[i].checked == true) {
        strPart2 = durationGroup[i].value;
        this.setState(
          (state, props) => {
            return {
              selectedDuration: durationGroup[i].value //选中的购买时长
            };
          },
          () => {
            console.log(this.state);
          }
        );
      }
    }
    let tempPrice = strPart1 + strPart2;
    // console.log(tempPrice);
    // 计算最终价格
    this.calcTotalPrice(tempPrice);
  };

  // 商品规格组合改变，重新计算最终价格
  onChange = e => {
    // 判断当前选中项是否为试用商品，如果是，禁止选择购买时长
    let isSy = e.target.getAttribute("isSy");
    let versionGroup = document.getElementsByName("versionGroup");
    let durationGroup = document.getElementsByName("durationGroup");
    if (isSy == "0") {
      for (let i = 0; i < durationGroup.length; i++) {
        durationGroup[i].checked = false;
        durationGroup[i].disabled = true;
      }

      for (let i = 0; i < versionGroup.length; i++) {
        if (versionGroup[i].checked == true) {
          this.setState((state, props) => {
            return {
              selectedVersion: versionGroup[i].value,
              selectedDuration: 1
            };
          });
        }
      }
      let tempPrice = "101";
      this.calcTotalPrice(tempPrice);
    } else {
      // 不是试用商品，解除按钮禁止状态
      for (let i = 0; i < durationGroup.length; i++) {
        durationGroup[i].disabled = false;
      }
      // 依次序筛选出，每组中的选中的单选框，取出对应value值，拼接商品规格字符串
      let strPart1 = "";
      let strPart2 = "";
      for (let i = 0; i < versionGroup.length; i++) {
        if (versionGroup[i].checked == true) {
          strPart1 = versionGroup[i].value;
          this.setState((state, props) => {
            return {
              selectedVersion: versionGroup[i].value
            };
          });
        }
      }
      for (let i = 0; i < durationGroup.length; i++) {
        if (durationGroup[i].checked == true) {
          strPart2 = durationGroup[i].value;
          this.setState((state, props) => {
            return {
              selectedDuration: durationGroup[i].value
            };
          });
        }
      }
      let tempPrice = strPart1 + strPart2;
      // 计算最终价格
      this.calcTotalPrice(tempPrice);
    }
  };

  // 确认订单
  confirmOrder = () => {
    // 判断用户是否登录，没登录提示需要登录
    var loginstatus = localStorage.getItem("token");
    if (loginstatus == "" || loginstatus == null) {
      alert("登陆后方可操作！");
      return;
    }
    // 判断商品是否试用，展示相应提示
    // 判断当前选中项是否为试用商品，如果是，禁止选择购买时长
    let isSy;
    let versionGroup = document.getElementsByName("versionGroup");
    let durationGroup = document.getElementsByName("durationGroup");
    for (let index = 0; index < versionGroup.length; index++) {
      const element = versionGroup[index];
      if (element.checked == true) {
        isSy = element.getAttribute("isSy");
      }
    }
    console.log("issy=========" + isSy);
    if (isSy == "0") {
      // 是试用商品，直接购买
      const data = {
        orderName: this.state.goodsName,
        orderType: 0,
        commodityId: this.state.goodsId,
        serviceSize: this.state.selectedVersion,
        serviceTime: this.state.selectedDuration
      };
      // console.log(data);
      this.props.history.push(`/confirmOrder/${JSON.stringify(data)}`);
    } else {
      // 否则，判断是否选择过购买时长，如未选择提示
      let flag;
      for (let index = 0; index < durationGroup.length; index++) {
        const element = durationGroup[index];
        if (element.checked == true) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (!flag) {
        alert("请选择购买时长！");
        return;
      } else {
        const data = {
          orderName: this.state.goodsName,
          orderType: 0,
          commodityId: this.state.goodsId,
          serviceSize: this.state.selectedVersion,
          serviceTime: this.state.selectedDuration
        };
        // console.log(data);
        this.props.history.push(`/confirmOrder/${JSON.stringify(data)}`);
      }
    }
  };

  render() {
    return (
      <div id="wrapper">
        <HeaderCommon />
        <Card>
          <p>商品名称：{this.state.goodsName}</p>
          <p>商品简介：{this.state.goodsDesc}</p>
          <p>
            最终价格：￥
            <span style={{ fontSize: "30px" }}>{this.state.totalPrice}</span>元
          </p>
          {/* 规格版本 */}
          <h3 style={{ margin: "10px 0" }}>{this.state.versionName}</h3>
          {this.state.versionGroup.map((item, index) => {
            return (
              <label
                key={index}
                style={{ display: "inline-block", marginRight: "25px" }}
              >
                <input
                  type="radio"
                  value={item.value}
                  name="versionGroup"
                  onChange={this.onChange}
                  //试用标识
                  isSy={item.isSy}
                />
                {item.show}
              </label>
            );
          })}
          {/* 购买时长 */}
          <h3 style={{ margin: "10px 0" }}>{this.state.durationName}</h3>
          {this.state.durationGroup.map((item, index) => {
            return (
              <label
                key={index}
                style={{ display: "inline-block", marginRight: "25px" }}
              >
                <input
                  type="radio"
                  value={item.value}
                  name="durationGroup"
                  onChange={this.onChange}
                />
                {item.show}
              </label>
            );
          })}
          {/* 购买按钮 */}
          <div style={{ margin: "20px 0" }}>
            <Button onClick={this.confirmOrder}>立即购买，此处鉴权</Button>
          </div>
        </Card>
        <FooterCommon />
      </div>
    );
  }
}

export default index;
