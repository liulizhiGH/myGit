import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Button, Pagination, Card, message, Icon } from "antd";
import axios from "../../../utils/axiosUtils";
import formatDateUtils from "../../../utils/formatDateUtils";
import defaultGoodsImg from "../../../static/defaultGoodsImg.png";
import { DeleteBtn } from "./style";

const TabPane = Tabs.TabPane;

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOrderListShow:false,//是否显示删除订单列表
      defaultCurrent: 1, //默认的当前页码，第一页
      defaultPageSize: 100, //默认的每页条数，10条
      allTotal: 0, //全部订单的总条数
      unfinishedTotal: 0, //待支付订单的总条数
      finishedTotal: 0, //已完成订单的总条数
      closedTotal: 0, //已失效订单的总条数
      deletedTotal: 0, //已删除订单的总条数
      all: [], //全部
      unfinished: [], //待支付
      finished: [], //已完成
      closed: [], //已失效
      deleted: [] //已删除
    };
  }

  componentDidMount() {
    this.getAllOrderlist();
  }
  // 获取全部未删除订单(仅传递isDelete即可)
  getAllOrderlist = () => {
    let postData = {
      isDelete: 0,
      current: this.state.defaultCurrent,
      pageSize: this.state.defaultPageSize
    };
    axios({
      method: "post",
      url: "/order/getOrderPage",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState((state, props) => {
            return {
              allTotal: res.data.data.total || 0,
              all: res.data.data.list || []
            };
          });
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };
  // 获取全部已删除订单（仅传递isDelete即可)
  getAllDeletedOrderlist = e => {
    let domObj=document.getElementById("deleteOrderList");
    domObj.style.color = "blue";
    document.getElementsByClassName('ant-tabs-content ant-tabs-content-animated ant-tabs-top-content')[0].style.display="none";
    let postData = {
      isDelete: 1,
      current: this.state.defaultCurrent,
      pageSize: this.state.defaultPageSize
    };
    axios({
      method: "post",
      url: "/order/getOrderPage",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState((state, props) => {
            return {
              deleted: res.data.data.list || []
            };
          });
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };
  // 根据不同的key值，获取不同类型的订单列表(前提是：未删除的订单)
  callback = key => {
    document.getElementsByClassName('ant-tabs-content ant-tabs-content-animated ant-tabs-top-content')[0].style.display="flex";
    // console.log(key);
    let postData;
    // 获取全部订单
    if (key == 3) {
      postData = {
        isDelete: 0,
        current: this.state.defaultCurrent,
        pageSize: this.state.defaultPageSize
      };
    }
    //获取待支付订单
    if (key == 0) {
      postData = {
        orderStatus: 0,
        isDelete: 0,
        current: this.state.defaultCurrent,
        pageSize: this.state.defaultPageSize
      };
    }
    //获取已取消订单
    if (key == 1) {
      postData = {
        orderStatus: 1,
        isDelete: 0,
        current: this.state.defaultCurrent,
        pageSize: this.state.defaultPageSize
      };
    }
    //获取已完成订单
    if (key == 2) {
      postData = {
        orderStatus: 2,
        isDelete: 0,
        current: this.state.defaultCurrent,
        pageSize: this.state.defaultPageSize
      };
    }
    axios({
      method: "post",
      url: "/order/getOrderPage",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState(
            (state, props) => {
              if (key == 3) {
                return {
                  defaultCurrent: 1,
                  defaultPageSize: 4,
                  // defaultCurrent:this.state.defaultCurrent,
                  // defaultPageSize:this.state.defaultPageSize,
                  allTotal: res.data.data.total || 0,
                  all: res.data.data.list || []
                };
              }
              if (key == 0) {
                return {
                  unfinishedTotal: res.data.data.total || 0,
                  unfinished: res.data.data.list || []
                };
              }
              if (key == 1) {
                return {
                  closedTotal: res.data.data.total || 0,
                  closed: res.data.data.list || []
                };
              }
              if (key == 2) {
                return {
                  finishedTotal: res.data.data.total || 0,
                  finished: res.data.data.list || []
                };
              }
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
  // pageSize每页条数,改变后的回调函数
  pageSizeOnShowSizeChange = (current, pageSize, orderStatus, isDelete) => {
    console.log(current, pageSize, orderStatus, isDelete);
    let postData;
    // 获取全部订单
    if (isDelete == 0) {
      postData = {
        isDelete: 0,
        current: current,
        pageSize: pageSize
      };
    }
    //获取待支付订单
    if (orderStatus == 0 && isDelete == 0) {
      postData = {
        orderStatus: 0,
        isDelete: 0,
        current: current,
        pageSize: pageSize
      };
    }
    //获取已取消订单
    if (orderStatus == 1 && isDelete == 0) {
      postData = {
        orderStatus: 1,
        isDelete: 0,
        current: current,
        pageSize: pageSize
      };
    }
    //获取已完成订单
    if (orderStatus == 2 && isDelete == 0) {
      postData = {
        orderStatus: 2,
        isDelete: 0,
        current: current,
        pageSize: pageSize
      };
    }
    axios({
      method: "post",
      url: "/order/getOrderPage",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        // if (res.data.code === 200) {
        //   this.setState((state, props) => {
        //     return {
        //       all: res.data.data.list || []
        //     };
        //   });
        // }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };
  // current当前页数,改变后的回调函数
  currentOnChange = (page, pageSize) => {
    console.log(page, pageSize);
    let postData = {
      isDelete: 1,
      current: 1,
      pageSize: 10
    };
    axios({
      method: "post",
      url: "/order/getOrderPage",
      data: postData
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.setState((state, props) => {
            return {
              all: res.data.data.list || []
            };
          });
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };
  // 删除订单
  dleteOrder = orderId => {
    let postData = {
      orderId: orderId
    };
    console.log(orderId);
    return;
    axios({
      method: "post",
      url: "/order/deleteOrder",
      data: postData
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
      <div>
        {/* 删除订单记录按钮 */}
        <DeleteBtn
          onClick={e => {
            this.getAllDeletedOrderlist(e);
          }}
          id="deleteOrderList"
        >
          <Icon type="clock-circle" className="icon" />
          <span>订单删除记录</span>
        </DeleteBtn>
        <Tabs defaultActiveKey="3" onChange={this.callback}>
          <TabPane tab="全部订单" key="3">
            {this.state.all.map((item, index) => {
              // 订单状态不同，操作按钮不同
              let operationBtn;
              if (item.isDelete == 0) {
                if (item.orderStatus == 0) {
                  // 待支付的订单
                  operationBtn = (
                    <div>
                      <Link to={`/orderCenter/orderDetail/${item.orderId}`}>
                        <Button type="danger">立即支付</Button>
                      </Link>
                    </div>
                  );
                }
              } else if (item.isDelete == 1) {
              }
              return (
                <Card
                  key={index}
                  title="订单简介"
                  size="small"
                  extra={
                    <Button
                      onClick={() => {
                        this.dleteOrder(item.orderId);
                      }}
                    >
                      删除订单
                    </Button>
                  }
                  style={{ width: "100%" }}
                >
                  <p>订单状态：{item.orderStatus}</p>
                  <p>订单是否删除：{item.isDelete}</p>
                  <p>订单id：{item.orderId}</p>
                  <p>订单创建日期：{formatDateUtils(item.createDate, 1)}</p>
                  <p>产品名称：{item.orderName}</p>
                  <p>原件：{item.nPrice} </p>
                  <p>实收价：{item.pPrice} </p>
                  {/* 操作按钮区域 */}
                  <div>
                    <Link to={`/orderCenter/orderDetail/${item.orderId}`}>
                      <Button type="primary">订单详情</Button>
                    </Link>
                    {operationBtn}
                  </div>
                </Card>
              );
            })}
            <Pagination
              showSizeChanger
              onShowSizeChange={(current, pageSize) =>
                this.pageSizeOnShowSizeChange(current, pageSize, undefined, 0)
              }
              onChange={this.currentOnChange}
              defaultCurrent={this.state.defaultCurrent}
              defaultPageSize={this.state.defaultPageSize} //不使用pageSize属性，因为使用它时，onShowSizeChange效果在页面上不显示
              total={this.state.allTotal}
            />
          </TabPane>
          <TabPane tab={`待支付${this.state.unfinishedTotal}`} key="0">
            {this.state.unfinished.map((item, index) => {
              return (
                <Card
                  key={index}
                  title="订单简介"
                  size="small"
                  extra={<a href="#">More</a>}
                  style={{ width: "100%" }}
                >
                  <p>订单状态：{item.orderStatus}</p>
                  <p>订单是否删除：{item.isDelete}</p>
                  <p>订单id：{item.orderId}</p>
                  <p>订单创建日期：{formatDateUtils(item.createDate, 1)}</p>
                  <p>产品名称：{item.commodityId}</p>
                  <p>原件：{item.nPrice} </p>
                  <p>实收价：{item.pPrice} </p>
                  <Link to={`/orderCenter/orderDetail/${item.orderId}`}>
                    <Button type="primary">订单详情</Button>
                  </Link>
                </Card>
              );
            })}
            <Pagination
              showSizeChanger
              onShowSizeChange={(current, pageSize) =>
                this.pageSizeOnShowSizeChange(current, pageSize, 17)
              }
              onChange={this.currentOnChange}
              defaultCurrent={this.state.defaultCurrent}
              defaultPageSize={this.state.defaultPageSize} //不使用pageSize属性，因为使用它时，onShowSizeChange页面上不生效
              total={this.state.unfinishedTotal}
            />
          </TabPane>
          <TabPane tab="已完成" key="2">
            {this.state.finished.map((item, index) => {
              return (
                <Card
                  key={index}
                  title="订单简介"
                  size="small"
                  extra={<a href="#">More</a>}
                  style={{ width: "100%" }}
                >
                  <p>订单状态：{item.orderStatus}</p>
                  <p>订单是否删除：{item.isDelete}</p>
                  <p>订单id：{item.orderId}</p>
                  <p>订单创建日期：{formatDateUtils(item.createDate, 1)}</p>
                  <p>产品名称：{item.commodityId}</p>
                  <p>原件：{item.nPrice} </p>
                  <p>实收价：{item.pPrice} </p>
                  <Link to={`/orderCenter/orderDetail/${item.orderId}`}>
                    <Button type="primary">订单详情</Button>
                  </Link>
                </Card>
              );
            })}
            <Pagination
              showSizeChanger
              onShowSizeChange={(current, pageSize) =>
                this.pageSizeOnShowSizeChange(current, pageSize, 17)
              }
              onChange={this.currentOnChange}
              defaultCurrent={this.state.defaultCurrent}
              defaultPageSize={this.state.defaultPageSize} //不使用pageSize属性，因为使用它时，onShowSizeChange页面上不生效
              total={this.state.finishedTotal}
            />
          </TabPane>
          <TabPane tab="已失效" key="1" id="asdasdasd777">
            {this.state.closed.map((item, index) => {
              return (
                <Card
                  key={index}
                  title="订单简介"
                  size="small"
                  extra={<a href="#">More</a>}
                  style={{ width: "100%" }}
                >
                  <p>订单状态：{item.orderStatus}</p>
                  <p>订单是否删除：{item.isDelete}</p>
                  <p>订单id：{item.orderId}</p>
                  <p>订单创建日期：{formatDateUtils(item.createDate, 1)}</p>
                  <p>产品名称：{item.commodityId}</p>
                  <p>原件：{item.nPrice} </p>
                  <p>实收价：{item.pPrice} </p>
                  <Link to={`/orderCenter/orderDetail/${item.orderId}`}>
                    <Button type="primary">订单详情</Button>
                  </Link>
                </Card>
              );
            })}
            <Pagination
              showSizeChanger
              onShowSizeChange={(current, pageSize) =>
                this.pageSizeOnShowSizeChange(current, pageSize, 17)
              }
              onChange={this.currentOnChange}
              defaultCurrent={this.state.defaultCurrent}
              defaultPageSize={this.state.defaultPageSize} //不使用pageSize属性，因为使用它时，onShowSizeChange页面上不生效
              total={this.state.closedTotal}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default index;
