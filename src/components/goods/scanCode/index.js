import React, { Component } from "react";
import { Button, message } from "antd";
import HeaderCommon from "../../common/header";
import FooterCommon from "../../common/footer";
import QRCode from "qrcode-react";
import alipay from "../../../static/alipay.png";
import weixinpay from "../../../static/weixinpay.png";
import axios from "../../../utils/axiosUtils";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrString:
        decodeURIComponent(JSON.parse(this.props.match.params.data).qrString) ||
        "",
      payType: JSON.parse(this.props.match.params.data).payType || ""
    };
  }

  componentDidMount = () => {
    this.checkOrderStatus();
    console.log(JSON.parse(this.props.match.params.data).orderId);
  };

  //查询订单状态
  getOrderStatus = timer => {
    let postData = {
      orderId: JSON.parse(this.props.match.params.data).orderId
    };
    axios({
      method: "post",
      url: "/order/getPayStatus",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          if (res.data.data == "0") {
          }
          if (res.data.data == "1") {
            message.info("订单已取消,请重新下单！");
            // 满足条件，停止轮询，清空定时器
            clearInterval(timer);
          }
          if (res.data.data == "2") {
            // 满足条件，停止轮询，清空定时器
            clearInterval(timer);
            let data = {
              orderId: JSON.parse(this.props.match.params.data).orderId,
              orderStatus: res.data.data
            };
            this.props.history.push(`/payResult/${JSON.stringify(data)}`);
          }
        } else {
          message.info("网络或服务器错误,请到订单中心查看订单状态！");
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  // 轮询订单状态,用以显示扫码支付是否成功
  checkOrderStatus = () => {
    let timer = setInterval(this.getOrderStatus(timer), 1000);
  };

  render() {
    // 根据payType选择支付二维码中间logo
    const logo = this.state.payType == "A01" ? alipay : weixinpay;
    return (
      <div id="wrapper">
        <HeaderCommon />
        <div style={{ textAlign: "center", padding: "40px" }}>
          扫码支付：
          <br />
          <br />
          <QRCode
            value={this.state.qrString}
            size={195}
            logo={logo}
            logoWidth={47}
          />
        </div>
        <FooterCommon />
      </div>
    );
  }
}

export default index;
