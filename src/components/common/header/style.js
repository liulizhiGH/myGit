import styled from "styled-components";

export const Wrapper = styled.div`
  overflow: hidden;
  line-height: 70px;
  .ant-popover-inner-content {
    padding: 0 !important;
  }

  .logo {
    float: left;
    margin: 0 60px 0 30px;
    img {
      max-height: 44px;
      cursor: pointer;
    }
  }
`;

export const Navbar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 16px;
  .navItem {
    position: relative;
    margin-right: 40px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
  }
  .navItem:hover {
    color: rgba(7, 133, 253, 1) !important;
  }
  .navItem:hover:after {
    display: table;
    position: absolute;
    bottom: 0;
    width: 100%;
    content: "";
    border-bottom: 2px solid rgba(7, 133, 253, 1);
  }
`;
// 气泡卡片内容
export const PopoverContent = styled.div`
  padding: 30px 30px 15px 30px;
  text-align: center;
  .item1 {
    display: inline-block;
    margin-right: 30px;
    img {
      max-width: 90px;
    }
    span {
      color: rgba(51, 51, 51, 1);
    }
  }
  .item2 {
    display: inline-block;
    img {
      max-width: 90px;
    }
    span {
      color: rgba(51, 51, 51, 1);
    }
  }
`;
