import React, { Component } from "react";
import { Route, Link, HashRouter } from "react-router-dom";
import { Layout, Menu, Icon, message, Button } from "antd";
import HeaderCommon from "../common/header";
import OrderList from "./orderList";
import OrderDetail from "./orderDetail";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 根据页面的路由，激活相应的菜单
      defaultSelectedKeys: this.props.location.pathname
    };
  }

  componentDidMount() {
    console.log(this.props.location.pathname);
  }
  render() {
    return (
      // 一定要写HashRouter，不然无法定义嵌套路由的子组件
      <HashRouter>
        <div>
          <HeaderCommon />
          <Layout>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                theme="dark"
                mode="inline"
                // 默认打开某组子菜单
                defaultOpenKeys={["sub1"]}
                // 默认激活某个菜单项
                defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="/orderCenter/orderList">
                  <Icon type="video-camera" />
                  <span>我的订单</span>
                  <Link to="/orderCenter/orderList" />
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="laptop" />
                      发票管理
                    </span>
                  }
                >
                  <Menu.Item key="hhh">发票信息管理</Menu.Item>
                  <Menu.Item key="3">发票索取</Menu.Item>
                  <Menu.Item key="4">消费记录</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "24px" }}>
              {/* 右侧容器 */}
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {/* 子路由设置路径时，要把父路径带上不然逻辑关系错误，变成平级了 */}
                <Route
                  // 例如：如下表示订单中心下的订单列表组件
                  path="/orderCenter/orderList"
                  exact
                  component={OrderList}
                />
                <Route
                  path="/orderCenter/orderDetail/:data"
                  exact
                  component={OrderDetail}
                />
              </Content>
            </Layout>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}

export default index;
