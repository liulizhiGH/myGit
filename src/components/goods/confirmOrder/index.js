import React, { Component } from "react";
import { Button, Input, message } from "antd";
import HeaderCommon from "../../common/header";
import FooterCommon from "../../common/footer";
import axios from "../../../utils/axiosUtils";
import formatDateUtils from "../../../utils/formatDateUtils";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 提交订单
  createOrder = () => {
    let data = JSON.parse(this.props.match.params.data);
    // console.log(data);
    axios({
      method: "post",
      url: "/order/createOrder",
      data: {
        commodityId: data.commodityId,
        orderName: data.orderName,
        orderType: data.orderType,
        serviceSize: data.serviceSize,
        serviceTime: data.serviceTime
      }
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          let data = {
            orderId: res.data.data.orderId,
            remark: res.data.data.remark
          };
          this.props.history.push(`/payOrder/${JSON.stringify(data)}`);
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  render() {
    return (
      <div id="wrapper">
        <HeaderCommon />
        我是确认订单页
        <Button onClick={this.createOrder}>提交订单</Button>
        <FooterCommon />
      </div>
    );
  }
}
export default index;
