import React, { Component } from "react";
import "antd/dist/antd.css"; //引入antd样式
import { GlobalStyle } from "../globalStyle"; //放在antd的样式之后，覆盖之
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/home";
import ConcatUs from "../components/concatUs";
import JoinUs from "../components/joinUs";
import ServiceAgreement from "../components/serviceAgreement";
import ForgetPwd from "../components/forgetPwd";
import Profile from "../components/profile";
import CaCenter from "../components/caCenter";
import OrderCenter from "../components/orderCenter";
import Goods from "../components/goods";
import ConfirmOrder from "../components/goods/confirmOrder";
import PayOrder from "../components/goods/payOrder";
import ScanCode from "../components/goods/scanCode";
import PayResult from "../components/goods/payResult";
import DataCenter from "../components/dataCenter";
import InvoiceCenter from "../components/invoiceCenter";

class MyRouter extends Component {
  render() {
    return (
      // 设置高度等于窗口高度
      <div style={{ height: "100%" }}>
        <GlobalStyle />
        <HashRouter>
          <Switch>
            {/* 主页 */}
            <Route path="/home" exact component={Home} />
            {/* 联系我们 */}
            <Route path="/concatUs" exact component={ConcatUs} />
            {/* 加入我们 */}
            <Route path="/joinUs" exact component={JoinUs} />
            {/* 用户服务协议 */}
            <Route
              path="/serviceAgreement"
              exact
              component={ServiceAgreement}
            />
            {/* 忘记密码 */}
            <Route path="/forgetPwd" exact component={ForgetPwd} />
            {/* 用户中心 */}
            <Route path="/profile" exact component={Profile} />
            {/* 证书中心。有子路由的路由，在此处千万不要写exact，会匹配不到，例如下面这个就不要写 */}
            <Route path="/caCenter" component={CaCenter} />
            {/* 订单中心。有子路由的路由，在此处千万不要写exact，会匹配不到，例如下面这个就不要写 */}
            <Route path="/orderCenter" component={OrderCenter} />
            {/* 商品单页 */}
            <Route path="/goods/:data" exact component={Goods} />
            {/* 确认订单页 */}
            <Route path="/confirmOrder/:data" exact component={ConfirmOrder} />
            {/* 选择支付方式页 */}
            <Route path="/payOrder/:data" exact component={PayOrder} />
            {/* 扫码支付页 */}
            <Route path="/scanCode/:data" exact component={ScanCode} />
            {/* 支付结果页 */}
            <Route path="/payResult/:data" exact component={PayResult} />
            {/* 数据服务中心。有子路由的路由，在此处千万不要写exact，会匹配不到，例如下面这个就不要写 */}
            <Route path="/dataCenter" component={DataCenter} />
            {/* 发票中心。有子路由的路由，在此处千万不要写exact，会匹配不到，例如下面这个就不要写 */}
            <Route path="/invoiceCenter" component={InvoiceCenter} />
            {/* 兜底组件，都不匹配时回到首页 */}
            <Redirect to="/home" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default MyRouter;
