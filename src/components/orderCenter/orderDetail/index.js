import axios from "../../../utils/axiosUtils";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { message, Button, Card } from "antd";
import formatDateUtils from "../../../utils/formatDateUtils";

export class index extends Component {
  constructor(props) {
    super(props);
    //订单详情的数据
    this.state = {
      orderDetail: {
        commodity: {}
      }
    };
  }
  componentDidMount() {
    this.getOrderDetail();
  }
  // 根据订单id,获取相应订单详情
  getOrderDetail = () => {
    let orderId = this.props.match.params.data;
    let postData = {
      orderId: orderId
    };
    axios({
      method: "post",
      url: "/order/getDetail",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState(
            (state, props) => {
              return {
                orderDetail: res.data.data || { commodity: {} } //备选值，防止token失效，页面跳转不及时报错
              };
            },
            () => {
              console.log(this.state.orderDetail);
            }
          );
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  render() {
    let data = JSON.stringify({
      orderId: this.props.match.params.data
    });
    return (
      <div>
        <Link to="/orderCenter/orderList">
          <Button>返回列表</Button>
        </Link>
        <Card title="相应订单详情" size="small" style={{ width: "100%" }}>
          <p>订单id：{this.state.orderDetail.orderId}</p>
          <p>
            订单创建日期：{formatDateUtils(this.state.orderDetail.createDate)}
          </p>
          <p>产品名称：{this.state.orderDetail.commodity.commodityName}</p>
          <p>原件：{this.state.orderDetail.nPrice} </p>
          <p>实收价：{this.state.orderDetail.pPrice} </p>
          <p>订单备注：{this.state.orderDetail.remark} </p>
          <Link to={"/payOrder/" + data}>
            <Button type="danger">立即支付</Button>
          </Link>
        </Card>
      </div>
    );
  }
}

export default index;
