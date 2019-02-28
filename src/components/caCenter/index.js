import React, { Component } from "react";
import { Route, Link, HashRouter } from "react-router-dom";
import { Layout, Menu, Icon, message, Button } from "antd";
import HeaderCommon from "../common/header";
import axios from "../../utils/axiosUtils";
import FrozenCA from "./personalCA/FrozenCA";
import UnFrozenCA from "./personalCA/UnFrozenCA";
import UpdateCAPhone from "./personalCA/UpdateCAPhone";
import NewCAPhone from "./personalCA/NewCAPhone";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 根据页面的路由，激活相应的菜单
      defaultSelectedKeys: this.props.location.pathname
    };
  }
  componentDidMount() {
    this.getCAinfo();
  }
  // 获取个人ca信息
  getCAinfo = () => {
    axios({
      method: "post",
      url: "/ca/getCaUserInfo"
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <HeaderCommon />
          <Layout>
            <Sider
              width={200}
              style={{
                overflow: "auto",
                height: "100vh"
              }}
            >
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                defaultOpenKeys={["sub1", "sub2"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      个人证书
                    </span>
                  }
                >
                  <Menu.Item key="/caCenter/frozenCA">
                    <Icon type="video-camera" />
                    <span>冻结证书</span>
                    <Link to="/caCenter/frozenCA" />
                  </Menu.Item>
                  <Menu.Item key="/caCenter/unFrozenCA">
                    <Icon type="video-camera" />
                    <span>解冻证书</span>
                    <Link to="/caCenter/unFrozenCA" />
                  </Menu.Item>
                  <Menu.Item key="/caCenter/updateCAPhone">
                    <Icon type="video-camera" />
                    <span>修改ca预留手机号</span>
                    <Link to="/caCenter/updateCAPhone" />
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      企业证书
                    </span>
                  }
                >
                  <Menu.Item key="5">快速新办</Menu.Item>
                  <Menu.Item key="6">在线更新</Menu.Item>
                  <Menu.Item key="7">预约办理</Menu.Item>
                  <Menu.Item key="8">操作记录</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ marginLeft: "200", padding: "24px" }}>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {/* 子路由设置路径时，要把父路径带上不然逻辑关系错误，变成平级了 */}
                <Route path="/caCenter/frozenCA" component={FrozenCA} />
                <Route path="/caCenter/unFrozenCA" component={UnFrozenCA} />
                <Route
                  path="/caCenter/updateCAPhone"
                  component={UpdateCAPhone}
                />
                <Route path="/caCenter/newCAPhone" component={NewCAPhone} />
              </Content>
            </Layout>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}

export default index;
