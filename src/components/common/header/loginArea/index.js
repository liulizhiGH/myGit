import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Modal,
  message,
  Button,
  Form,
  Icon,
  Input,
  Tabs,
  Badge,
  Popover
} from "antd";
import axios from "../../../../utils/axiosUtils";
import md5 from "js-md5";
import defaultImg from "../../../../static/default.png";
import notification from "../../../../static/notification.png";
import { Wrapper, PopoverContent } from "./style";
import setup from "../../../../static/haderPopover/setup.png";
import service from "../../../../static/haderPopover/service.png";
import order from "../../../../static/haderPopover/order.png";
import loginout from "../../../../static/haderPopover/loginout.png";
import courseManage from "../../../../static/haderPopover/courseManage.png";
import certificate from "../../../../static/haderPopover/certificate.png";

class LoginArea extends Component {
  constructor(props) {
    super(props);
    // 初始值
    this.state = {
      visible: false, //控制modal框显隐
      defaultActiveKey: "1", //tabs面板初始key,注意类型是string，不是number
      loginStatus: localStorage.getItem("token") ? true : false, //初步判断用户登录状态,当做ui状态使用。详细的状态判断应该放在axios的返回拦截器中，这样可以根据后台返回的状态码，判断token是否过期失效等，以便前端自己重定向及重新登录获取token
      accountLoginShow: true, //控制账号登录表单显隐
      fastLoginShow: false, //控制快捷登录表单显隐
      // 嵌套三元表达式
      userInfo: {
        userLogo: !!JSON.parse(localStorage.getItem("userInfo"))
          ? !!JSON.parse(localStorage.getItem("userInfo")).userLogo
            ? JSON.parse(localStorage.getItem("userInfo")).userLogo
            : defaultImg
          : defaultImg,
        userPhone: !!JSON.parse(localStorage.getItem("userInfo"))
          ? !!JSON.parse(localStorage.getItem("userInfo")).mobilePhone
            ? JSON.parse(localStorage.getItem("userInfo")).mobilePhone
            : "加载中..."
          : "加载中..."
      }
    };
  }

  // 手机号码加*号
  addStar = mobilePhone => {
    let temp;
    temp = mobilePhone.toString();
    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
    }
  };
  // 密码表单项，全部md5加密后传输
  // 账号密码登录表单校验
  accountLogin = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["mobilePhone_a", "password_a"],
      (err, values) => {
        if (!err) {
          let postData = {
            mobilePhone: values.mobilePhone_a,
            password: md5(values.password_a)
          };
          // 表单验证通过发送请求
          axios({
            method: "post",
            url: "/user/pwdLogin",
            data: postData
          })
            .then(res => {
              // 登陆成功缓存token和用户相关信息
              if (res.data.code === 200) {
                localStorage.setItem("token", res.data.data);
                axios({
                  method: "post",
                  url: "/user/getUserInfo"
                })
                  .then(res => {
                    // 存储用户信息
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.data)
                    );
                  })
                  .then(() => {
                    // 更新登录状态及需显示的用户信息，（此时userinfo已存在，无需在三元表达式上再判断）
                    this.setState((state, props) => {
                      return {
                        loginStatus: true,
                        userInfo: {
                          userLogo: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).userLogo
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .userLogo
                            : defaultImg,
                          userPhone: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).mobilePhone
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .mobilePhone
                            : "加载中..."
                        }
                      };
                    });
                  })
                  .catch(error => {
                    message.info(error.toString());
                  });
                // 关闭modal框
                this.handleCancel();
              } else {
                message.info(res.data.message);
              }
            })
            .catch(error => {
              message.info(error.toString());
            });
        }
      }
    );
  };
  // 快捷登录表单校验
  fastLogin = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["mobilePhone_f", "code_f"],
      (err, values) => {
        if (!err) {
          let postData = {
            mobilePhone: values.mobilePhone_f,
            code: values.code_f
          };
          // 表单验证通过发送请求
          axios({
            method: "post",
            url: "/user/phoneLogin",
            data: postData
          })
            .then(res => {
              // 登陆成功缓存token和用户相关信息
              if (res.data.code === 200) {
                localStorage.setItem("token", res.data.data);
                axios({
                  method: "post",
                  url: "/user/getUserInfo"
                })
                  .then(res => {
                    // 存储用户信息
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.data)
                    );
                  })
                  .then(() => {
                    // 更新登录状态及需显示的用户信息，（此时userinfo已存在，无需在三元表达式上再判断）
                    this.setState((state, props) => {
                      return {
                        loginStatus: true,
                        userInfo: {
                          userLogo: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).userLogo
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .userLogo
                            : defaultImg,
                          userPhone: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).mobilePhone
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .mobilePhone
                            : "加载中..."
                        }
                      };
                    });
                  })
                  .catch(error => {
                    message.info(error.toString());
                  });
                // 关闭modal框
                this.handleCancel();
              } else {
                message.info(res.data.message);
              }
            })
            .catch(error => {
              message.info(error.toString());
            });
        }
      }
    );
  };
  // 注册表单校验
  register = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["mobilePhone_r", "code_r", "password_r"],
      (err, values) => {
        if (!err) {
          let postData = {
            mobilePhone: values.mobilePhone_r,
            password: md5(values.password_r),
            code: values.code_r
          };
          // 表单验证通过发送请求
          axios({
            method: "post",
            url: "/user/register",
            data: postData
          })
            .then(res => {
              // 登陆成功缓存token和用户相关信息
              if (res.data.code === 200) {
                localStorage.setItem("token", res.data.data);
                axios({
                  method: "post",
                  url: "/user/getUserInfo"
                })
                  .then(res => {
                    // 存储用户信息
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.data)
                    );
                  })
                  .then(() => {
                    // 更新登录状态及需显示的用户信息，（此时userinfo已存在，无需在三元表达式上再判断）
                    this.setState((state, props) => {
                      return {
                        loginStatus: true,
                        userInfo: {
                          userLogo: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).userLogo
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .userLogo
                            : defaultImg,
                          userPhone: !!JSON.parse(
                            localStorage.getItem("userInfo")
                          ).mobilePhone
                            ? JSON.parse(localStorage.getItem("userInfo"))
                                .mobilePhone
                            : "加载中..."
                        }
                      };
                    });
                  })
                  .catch(error => {
                    message.info(error.toString());
                  });
                // 关闭modal框
                this.handleCancel();
              } else {
                message.info(res.data.message);
              }
            })
            .catch(error => {
              message.info(error.toString());
            });
        }
      }
    );
  };
  // 检测手机号是否存在（待完善，总是先于andt的其他校验规则生效，不好，总是需要访问后端，失去前端验证意义）
  checkPhoneNumber = (rule, value, callback) => {
    axios({
      method: "post",
      url: "/user/checkPhone",
      data: { mobilePhone: value }
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          console.log(rule);
          callback(rule.message);
        } else {
          callback();
        }
      })
      .catch(error => {
        message.info(error.toString());
      });
  };
  // 注册操作，获取短信验证码
  getSMSCodeToRegist = e => {
    e.preventDefault();
    this.props.form.validateFields(["mobilePhone_r"], (err, values) => {
      if (!err) {
        const postData = {
          mobile: values.mobilePhone_r,
          type: "loginCode"
        };
        axios({
          method: "post",
          url: "/sms/sendSms",
          data: postData
        })
          .then(res => {
            message.info(res.data.message);
          })
          .catch(error => {
            message.info(error.toString());
          });
      }
    });
  };
  // 快捷登录操作，获取短信验证码
  getSMSCodeToFastLogin = e => {
    e.preventDefault();
    this.props.form.validateFields(["mobilePhone_f"], (err, values) => {
      if (!err) {
        const postData = {
          mobile: values.mobilePhone_f,
          type: "loginCode"
        };
        axios({
          method: "post",
          url: "/sms/sendSms",
          data: postData
        })
          .then(res => {
            message.info(res.data.message);
          })
          .catch(error => {
            message.info(error.toString());
          });
      }
    });
  };
  // 安全退出,无需和后端交互，前端直接清空用户登录所有相关信息token状态,并跳转回首页
  loginOut = () => {
    localStorage.clear();
    this.props.history.replace("/home");
    this.setState((state, props) => {
      return {
        loginStatus: false
      };
    });
  };
  // Modal框控制显隐,和要初始激活的tabs页面
  showModal = defaultActiveKey => {
    this.setState(
      {
        visible: true,
        defaultActiveKey: defaultActiveKey
      },
      () => {
        console.log(this.state.defaultActiveKey);
      }
    );
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  // 切换登录方式
  switchLoginMode = () => {
    this.setState((state, props) => {
      return {
        accountLoginShow: !state.accountLoginShow,
        fastLoginShow: !state.fastLoginShow
      };
    });
  };

  render() {
    const TabPane = Tabs.TabPane;
    const { getFieldDecorator } = this.props.form;
    //popover气泡卡片内容
    const content = (
      <PopoverContent>
        <div className="userPhone">{this.state.userInfo.userPhone}</div>
        <div className="operationTop">
          <Link to="/caCenter/frozenCA" className="operationItem">
            <img src={certificate} alt="" />
            <span>我的证书</span>
          </Link>
          <Link to="/orderCenter/orderList" className="operationItem">
            <img src={order} alt="" />
            <span>我的订单</span>
          </Link>
          <Link to="/dataCenter" className="operationItem">
            <img src={service} alt="" />
            <span>我的服务</span>
          </Link>
          <Link
            to="/home"
            className="operationItem"
            style={{ marginBottom: "15px" }}
          >
            <img src={courseManage} alt="" />
            <span>我的课程</span>
          </Link>
        </div>
        <div className="operationBottom">
          <Link to="/profile" className="operationItem">
            <img src={setup} alt="" />
            <span>个人设置</span>
          </Link>
          <div className="operationItem" onClick={this.loginOut}>
            <img src={loginout} alt="" />
            <span>安全退出</span>
          </div>
        </div>
      </PopoverContent>
    );
    return (
      <Wrapper>
        {this.state.loginStatus ? (
          <div>
            <div className="notification">
              <img className="notificationIcon" src={notification} alt="" />
              <Badge count={5} className="flag" />
            </div>
            <Popover placement="topLeft" content={content} trigger="click">
              <div className="profile">
                <img src={this.state.userInfo.userLogo} alt="" />
              </div>
            </Popover>
          </div>
        ) : (
          <div>
            <span
              style={{
                display: "inline-block",
                marginRight: "40px",
                fontSize: "16px",
                cursor: "pointer"
              }}
              onClick={() => {
                this.showModal("1");
              }}
            >
              登录
            </span>
            <Button
              type="primary"
              onClick={() => {
                this.showModal("2");
              }}
            >
              注册
            </Button>
          </div>
        )}
        {/* 登录modal框 */}
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true} //关闭modal时，销毁内部元素，用以重新渲染，比如销毁tabs组件
        >
          <Tabs defaultActiveKey={this.state.defaultActiveKey}>
            <TabPane tab="登录" key="1">
              {/* 切换登录方式按钮 */}
              {this.state.accountLoginShow ? (
                <div>
                  <Button type="primary" onClick={this.switchLoginMode}>
                    使用短信验证登录
                  </Button>
                  <Form onSubmit={this.accountLogin}>
                    <Form.Item>
                      {getFieldDecorator("mobilePhone_a", {
                        rules: [
                          { required: true, message: "请输入手机号" },
                          {
                            pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/),
                            message: "手机号格式错误"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="请输入手机号"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("password_a", {
                        rules: [
                          {
                            required: true,
                            message: "请输入密码"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="请输入密码"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        账号密码登录
                      </Button>
                      <Link to="/forgetPwd">
                        <Button type="danger">忘记密码</Button>
                      </Link>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div>
                  <Button type="danger" onClick={this.switchLoginMode}>
                    使用密码验证登录
                  </Button>
                  <Form onSubmit={this.fastLogin}>
                    <Form.Item>
                      {getFieldDecorator("mobilePhone_f", {
                        rules: [
                          { required: true, message: "请输入手机号" },
                          {
                            pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/),
                            message: "手机号格式错误"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="请输入手机号"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("code_f", {
                        rules: [
                          {
                            required: true,
                            message: "请输入短信验证码"
                          }
                        ]
                      })(
                        <div>
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="password"
                            placeholder="请输入短信验证码"
                          />
                          <Button onClick={this.getSMSCodeToFastLogin}>
                            获取短信验证码
                          </Button>
                        </div>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        快捷登录
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </TabPane>
            <TabPane tab="注册" key="2">
              {/* 注册表单 */}
              <Form onSubmit={this.register} className="login-form">
                <Form.Item>
                  {getFieldDecorator("mobilePhone_r", {
                    rules: [
                      { required: true, message: "请输入手机号" },
                      {
                        pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/),
                        message: "手机号格式错误"
                      },
                      {
                        validator: this.checkPhoneNumber,
                        message: "该手机号已注册"
                      }
                    ],
                    // 设置表单校验子节点的时机，onBlur即失焦时校验，默认为onChange
                    validateTrigger: "onBlur"
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="请输入手机号"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("code_r", {
                    rules: [{ required: true, message: "请输入短信验证码" }]
                  })(
                    <div>
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="请输入短信验证码"
                      />
                      <Button onClick={this.getSMSCodeToRegist}>
                        获取短信验证码
                      </Button>
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password_r", {
                    rules: [
                      {
                        required: true,
                        message: "6-12位数字字母组合"
                      },
                      {
                        min: 6,
                        message: "长度不足6位"
                      },
                      {
                        max: 12,
                        message: "长度超出12位"
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z0-9_]+$/),
                        message: "密码格式错误"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="6-12位数字字母组合"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    注册
                  </Button>
                  <Link to="/serviceAgreement">
                    <div className="notice">
                      继续访问即代表您已同意和盛天元服务协议和隐私政策
                    </div>
                  </Link>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </Wrapper>
    );
  }
}

export default withRouter(Form.create()(LoginArea));
