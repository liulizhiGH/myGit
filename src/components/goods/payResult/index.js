import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderCommon from "../../common/header";
import FooterCommon from "../../common/footer";
import { Button } from "antd";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: JSON.parse(this.props.match.params.data).orderId,
      orderStatus: JSON.parse(this.props.match.params.data).orderStatus
    };
  }
  render() {
    return (
      <div id="wrapper">
        <HeaderCommon />
        {this.state.orderStatus == 2 ? (
          <div>购买成功</div>
        ) : (
          <div>购买异常待定</div>
        )}
        <Link to="/dataCenter">
          <Button type="danger">我的服务</Button>
        </Link>
        <Link to="/dataCenter" />
        <Button>索取发票</Button>
        <Link to="/dataCenter" />
        <Button>我的订单</Button>
        <FooterCommon />
      </div>
    );
  }
}

export default index;
