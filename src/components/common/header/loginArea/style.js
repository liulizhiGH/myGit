import styled from "styled-components";

export const Wrapper = styled.div`
  float: right;
  margin-right: 30px;
  .notification {
    position: relative;
    display: inline-block;
    width: 70px;
    text-align: center;
    border-left: 1px solid rgba(234, 234, 234, 1);
    border-right: 1px solid rgba(234, 234, 234, 1);
    .notificationIcon {
      width: 25px;
      cursor: pointer;
    }
    .flag {
      position: absolute;
      top: 10px;
      right: 5px;
      font-size: 10px;
      .ant-badge-count {
        height: 15px;
        line-height: 15px;
        font-size: 10px;
      }
    }
  }
  .profile {
    position: relative;
    display: inline-block;
    width: 70px;
    text-align: center;
    border-right: 1px solid rgba(234, 234, 234, 1);
    cursor: pointer;
    img {
      max-width: 40px;
    }
  }
  .profile:after {
    position: absolute;
    bottom: 3px;
    right: 3px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 6px solid rgba(198, 198, 198, 1);
    border-bottom: 6px solid rgba(198, 198, 198, 1);
    border-left: 6px solid transparent;
    content: "";
  }
`;
// 气泡卡片内容
export const PopoverContent = styled.div`
  width: 233px;
  font-size: 16px;
  overflow: hidden;
  .userPhone {
    padding: 30px 25px 35px 25px;
    overflow: hidden;
    font-weight: bold;
  }
  .operationTop {
    padding: 0 25px;
    overflow: hidden;
    border-bottom: 2px solid rgba(219, 219, 219, 1);
  }
  .operationBottom {
    padding: 13px 25px 5px 25px;
    overflow: hidden;
  }
  .operationItem {
    display: block;
    margin-bottom: 30px;
    cursor: pointer;
    img {
      margin-right: 24px;
      width: 25px;
      height: 25px;
    }
    span {
      vertical-align: middle;
    }
  }
`;
// 登录注册modal框
