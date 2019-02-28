import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderCommon from "../common/header";
import FooterCommon from "../common/footer";
import { Carousel, Card, Row, Col, Button, Icon, message } from "antd";
import styled from "styled-components";
import axios from "../../utils/axiosUtils";
import { Service, Shopping } from "./style";
import banner1 from "../../static/banner/banner1.png";
import banner2 from "../../static/banner/banner2.png";

const { Meta } = Card;

// 轮播图，利用styled修改antd默认样式
const MyCarousel = styled(Carousel)`
  .slick-slide {
    text-align: center;
    background: transparent;
    overflow: hidden;
    .item {
      height: 500px;
      color: #fff;
      background: url(${banner1}) no-repeat center;
      background-size: cover;
    }
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 商品大类
      goodsCategory: {
        commodities: []
      }
    };
  }
  componentDidMount() {
    // 显示来源页的地址，登陆成功后回到来源页
    // console.log(this.props.location.state);
    let from;
    if (this.props.location.state != null) {
      from = this.props.location.state.from;
    }
    // console.log(from);
    this.getGooodsList();
  }

  //获取商品列表
  getGooodsList = () => {
    axios({
      method: "post",
      url: "/commodity/getCommodityList"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState(
            (state, props) => {
              return {
                //暂时取数组中的第一项，即第一个商品大类
                goodsCategory: res.data.data[0] || {} //备选值，防止token失效，页面跳转不及时报错
              };
            },
            () => {
              console.log(this.state);
            }
          );
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };

  render() {
    return (
      <div id="wrapper">
        {/* 头部 */}
        <HeaderCommon />
        {/* 轮播图 */}
        <MyCarousel autoplay>
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
        </MyCarousel>
        {/* 可信服务 */}
        <Service>
          <div className="container">
            <Row gutter={32}>
              <h1>{this.state.goodsCategory.productName}</h1>
              {this.state.goodsCategory.commodities.map((item, index) => {
                return (
                  <Col span={6} key={index}>
                    <Link to={`/goods/${item.commodityId}`}>
                      <Card hoverable>
                        <Meta
                          title={item.productName}
                          description={item.commodityId}
                        />
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Service>
        {/* 财税课程 */}
        <Shopping>
          <div className="container">
            <Row gutter={32}>
              <h1>财税好课</h1>
              <Col span={6}>
                <Card hoverable>
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card hoverable>
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card hoverable>
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card hoverable>
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Shopping>
        {/* 脚部 */}
        <FooterCommon />
      </div>
    );
  }
}

export default Home;
