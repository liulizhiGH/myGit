import React, { Component } from "react";
import { Route, Link, HashRouter } from "react-router-dom";
import { Layout, Menu, Icon, message, Button } from "antd";
import HeaderCommon from "../common/header";
import axios from "../../utils/axiosUtils";

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
    const logo = {
      fontSize: "20px",
      color: "#fff",
      paddingLeft: "24px",
      margin: "16px auto"
    };
    return (
      <HashRouter>
        <div>
          <HeaderCommon />
          <Layout>
            <Sider
              width={252}
              style={{
                overflow: "auto",
                height: "calc(100vh - 70px)"
              }}
            >
              <div style={logo}>数据中心</div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                style={{ 
                  fontSize: "20px",
                  color:"red",
                 }}
              >
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span className="nav-text">nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span className="nav-text">nav 3</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="bar-chart" />
                  <span className="nav-text">nav 4</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="cloud-o" />
                  <span className="nav-text">nav 5</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="appstore-o" />
                  <span className="nav-text">nav 6</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <Icon type="team" />
                  <span className="nav-text">nav 7</span>
                </Menu.Item>
                {/* <Menu.Item key="8">
                  <Icon type="shop" />
                  <span className="nav-text">nav 8</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="cloud-o" />
                  <span className="nav-text">nav 5</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="appstore-o" />
                  <span className="nav-text">nav 6</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <Icon type="team" />
                  <span className="nav-text">nav 7</span>
                </Menu.Item>
                <Menu.Item key="8">
                  <Icon type="shop" />
                  <span className="nav-text">nav 8</span>
                </Menu.Item> */}
              </Menu>
            </Sider>
            <Content
              style={{
                overflow: "auto",
                height: "calc(100vh - 70px)",
                padding: "40px 31px 0 40px"
              }}
            >
              ...
              <br />
              Really
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              long
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              content
            </Content>
          </Layout>
        </div>
      </HashRouter>
    );
  }
}

export default index;
