import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popover, Modal } from "antd";
import { Wrapper, Navbar, PopoverContent } from "./style";
import logo from "../../../static/logo.png";
import LoginArea from "./loginArea";
import styled from "styled-components";
import { keyframes } from "styled-components";
import erweima1 from "../../../static/erweima1.png";
import erweima2 from "../../../static/erweima2.png";

// 定义下载app二维码出场动画
const downloadAPP = keyframes`
from {margin-bottom:-704px;}
to {margin-bottom:0;}
`;

// 修改modal组件默认样式
const MyModal = styled(Modal)`
  background: transparent;
  width: 446px !important;
  .ant-modal-content {
    position: relative;
    border-radius: 0;
    .ant-modal-header {
      padding: 0 !important;
      border-bottom: 0;
      text-align: center;
      .ant-modal-title {
        line-height: 130px !important;
        letter-spacing: 2px;
        font-size: 26px;
        font-weight: bold;
        color: rgba(7, 133, 253, 1);
      }
    }
    .ant-modal-body {
      padding: 0;
      line-height: 360px !important;
      text-align: center;
      box-shadow: 0 0 10px #75b3ef;
      overflow: hidden;
      img {
        width: 250px;
        height: 250px;
      }
    }
    .closeErweima {
      position: absolute;
      bottom: -52px;
      width: 100%;
      line-height: 43px;
      background: rgba(133, 144, 166, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 15px;
      cursor: pointer;
      letter-spacing: 2px;
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    //定义popover气泡卡片内容
    const content = (
      <PopoverContent>
        <div className="item1">
          <img src={erweima1} alt="" />
          <br />
          <span>订阅号</span>
        </div>
        <div className="item2">
          <img src={erweima2} alt="" />
          <br />
          <span>服务号</span>
        </div>
      </PopoverContent>
    );
    return (
      <Wrapper>
        {/* logo区域 */}
        <Link to="/home" className="logo">
          <img src={logo} alt="" />
        </Link>
        {/* 登录区域 */}
        <LoginArea style={{ float: "right" }} />
        {/* 导航菜单 */}
        <Navbar>
          <Link to="/home" className="navItem">
            首页
          </Link>
          {/* 弹出二维码 */}
          <Popover content={content} placement="topLeft" trigger="click">
            <div className="navItem">关注微信</div>
          </Popover>
          <div className="navItem" onClick={this.showModal}>
            下载APP
          </div>
          <Link to="/concatUs" className="navItem">
            合作伙伴
          </Link>
          <Link to="/joinUs" className="navItem">
            帮助与支持
          </Link>
        </Navbar>
        {/* 下载APPmodal框 */}
        <MyModal
          title="和盛天元综合服务平台"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          closable={false}
        >
          <img src={erweima2} alt="" />
          <div className="closeErweima" onClick={this.handleCancel}>
            关闭二维码
          </div>
        </MyModal>
      </Wrapper>
    );
  }
}

export default Header;
