import React, { Component } from "react";
import { Button, Card, message } from "antd";
import HeaderCommon from "../../common/header";
import FooterCommon from "../../common/footer";
import axios from "../../../utils/axiosUtils";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: JSON.parse(this.props.match.params.data).orderId,
      remark: JSON.parse(this.props.match.params.data).remark,
      payType: ""
    };
  }
  // 设置支付方式
  choosePayWay = payType => {
    this.setState(
      (state, props) => {
        return {
          payType: payType
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  // 立即支付
  payOrder = () => {
    // 防止用户不选择支付方式，进行操作
    if (this.state.payType == "" || this.state.payType == null) {
      message.info("请选择一种支付方式！");
      return;
    }
    // 获取支付二维码
    let postData = {
      orderId: this.state.orderId,
      payType: this.state.payType,
      remark: this.state.remark
    };
    axios({
      method: "post",
      url: "/pay/unitedPay",
      data: postData
    })
      .then(res => {
        console.log(res.data.data.qr);
        if (res.data.code === 200) {
          // 获得支付二维码后，跳转至扫码支付页面
          let data = JSON.stringify({
            orderId:this.state.orderId,
            qrString: encodeURIComponent(res.data.data.qr),
            payType: this.state.payType
          });
          this.props.history.push("/scanCode/" + data);
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
        <Card>
          <Button
            type="danger"
            id="A01"
            onClick={e => {
              this.choosePayWay(e.target.id);
            }}
          >
            支付宝
          </Button>
          <Button
            type="primary"
            id="W01"
            onClick={e => {
              this.choosePayWay(e.target.id);
            }}
          >
            微信
          </Button>
        </Card>
        <Button onClick={this.payOrder}>确认支付</Button>
        <FooterCommon />
      </div>
    );
  }
}

export default index;
