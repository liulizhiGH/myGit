import React, { Component } from "react";
import { Form, Steps, Button, message, Input, Icon } from "antd";
import Header from "../common/header";
import axios from "../../utils/axiosUtils";

const Step = Steps.Step;

const steps = [
  {
    title: "First",
    content: "First-content"
  },
  {
    title: "Second",
    content: "Second-content"
  },
  {
    title: "Last",
    content: "Last-content"
  }
];

class ForgetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  next = () => {
    const count = this.state.current + 1;
    this.setState((state, props) => {
      return { current: count };
    });
  };
  prev = () => {
    const count = this.state.current - 1;
    this.setState((state, props) => {
      return { current: count };
    });
  };
  // step1安全验证
  forgetPwdHandler = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["mobilePhone_f", "code_f"],
      (err, values) => {
        if (!err) {
          const postData = {
            mobilePhone: values.mobilePhone_f,
            code: values.code_f
          };
          axios({
            method: "post",
            url: "/user/forgetPwd",
            data: postData
          })
            .then(res => {
              message.info(res.data.message);
            })
            .catch(error => {
              message.info(error.toString());
            });
        }
      }
    );
  };
  // 获取短信验证码
  getSMSCode = e => {
    e.preventDefault();
    this.props.form.validateFields(["mobilePhone_f"], (err, values) => {
      if (!err) {
        const postData = {
          mobile: values.mobilePhone_f,
          type: "forgetCode"
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

  setNewPwd = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { current } = this.state;
    return (
      <div>
        <Header />
        <div style={{ maxWidth: "1200px", margin: "20px auto" }}>
          <Steps current={current}>
            {steps.map((item, index) => {
              return <Step title={item.title} key={index} />;
            })}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={this.next}>
                next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  message.info("done");
                }}
              >
                完成
              </Button>
            )}
            {current > 0 && (
              <Button type="danger" onClick={this.prev}>
                prev
              </Button>
            )}
          </div>
          {/* 获取短信验证码表单 */}
          <Form onSubmit={this.forgetPwdHandler}>
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
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请输入短信验证码"
                  />
                  <Button onClick={this.getSMSCode}>获取短信验证码</Button>
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                下一步
              </Button>
            </Form.Item>
          </Form>
          {/* 设置密码表单 */}
          <Form onSubmit={this.setNewPwd}>
            <Form.Item>
              {getFieldDecorator("mobilePhone_set", {
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
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="6-12位数字字母组合"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("mobilePhone_set_again", {
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
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
                设置密码
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(ForgetPwd);
