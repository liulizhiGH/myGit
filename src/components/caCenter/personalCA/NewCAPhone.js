import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import axios from "../../../utils/axiosUtils";

export class NewCAPhone extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let postData = {
          mobilePhone: values.newCAPhone,
          msspId: JSON.parse(localStorage.getItem("userInfo")).msspId,
          code: values.code,
          userId: JSON.parse(localStorage.getItem("userInfo")).userId
        };
        // 修改ca预留手机号
        axios({
          method: "post",
          url: "/ca/updateCaPhone",
          data: postData
        })
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data);
            } else {
              message.info(res.data.message);
            }
          })
          .catch(error => {
            message.info(error.toString());
          });
      }
    });
  };
  // 获取短信验证码
  getSMSCode = e => {
    e.preventDefault();
    this.props.form.validateFields(["newCAPhone"], (err, values) => {
      if (!err) {
        const postData = {
          mobile: values.newCAPhone,
          type: "caCode"
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("newCAPhone", {
            rules: [{ required: true, message: "请输入新手机号" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="输入新手机号"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: "请输入短信验证码" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="输入短信验证码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="danger" onClick={this.getSMSCode}>
            获取短信验证码
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(NewCAPhone);
