import React, { Component } from "react";
import HeaderCommon from "../common/header";
import FooterCommon from "../common/footer";

export class ConcatUs extends Component {
  render() {
    return (
      <div id="wrapper">
        <HeaderCommon />
        联系我们
        <FooterCommon />
      </div>
    );
  }
}

export default ConcatUs;
