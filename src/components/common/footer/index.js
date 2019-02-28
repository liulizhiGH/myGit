import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import footerErweima from "../../../static/erweima1.png";

//固定footer的高度+绝对定位,Wrapper类所包含的内容是页面上的实际内容
const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 309px;
  position: absolute;
  bottom: 0;
  background: rgba(49, 57, 71, 1);
`;
const MiddleWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  /* 中间内容区域 */
  .content {
    overflow: hidden;
    /* 底部导航 */
    .footerNav {
      float: left;
      margin-top: 75px;
      padding-right: 80px;
      height: 160px;
      border-right: 1px solid rgba(90, 94, 100, 1);
      .footerNavItem {
        display: inline-block;
        margin-right: 90px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1) !important;
      }
      .footerNavItem:hover {
        color: rgba(7, 133, 253, 1) !important;
      }
    }
    /* 二维码 */
    .footerErweima {
      float: left;
      margin-top: 68px;
      margin-left: 166px;
      text-align: center;
      img {
        vertical-align: middle;
        width: 134px;
      }
      span {
        display: inline-block;
        margin-top: 22px;
        vertical-align: middle;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .ICP {
    padding-top: 30px;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
  }
`;

class Footer extends Component {
  render() {
    return (
      <Wrapper>
        <MiddleWrapper>
          <div className="content">
            <div className="footerNav">
              <Link to="" className="footerNavItem">
                人才招聘
              </Link>
              <Link to="" className="footerNavItem">
                联系我们
              </Link>
              <Link to="" className="footerNavItem">
                公司新闻
              </Link>
              <Link to="" className="footerNavItem">
                友情链接
              </Link>
              <Link to="" className="footerNavItem">
                意见反馈
              </Link>
            </div>
            <div className="footerErweima">
              <img src={footerErweima} alt="" />
              <br />
              <span>关注我们</span>
            </div>
          </div>
          <div className="ICP">
            © 2015-2019 hsty.com 版权所有 ICP证：鲁B2-20150101
          </div>
        </MiddleWrapper>
      </Wrapper>
    );
  }
}

export default Footer;
