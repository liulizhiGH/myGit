import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    // 根据localStorage中是否存在token（登录成功时存入）判断用户是否登录
    const isLogged = localStorage.getItem("token") ? true : false;

    return (
      <Route
        {...rest}
        render={props => {
          return isLogged ? (
            <Component {...props} />
          ) : (
            //把来源页的信息传递到首页，以便登录成功后返回来源页
            <Redirect
              to={{
                pathname: "/home",
                state: { from: this.props.location.pathname }
              }}
            />
          );
        }}
      />
    );
  }
}

export default withRouter(PrivateRoute);
