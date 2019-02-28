import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
	color:rgba(51,51,51,1);
	line-height: 1.42857143;
}
a{
	color:rgba(51,51,51,1) !important;
}
/* 去除a标签激活后的下划线等默认效果 */
a:link{ text-decoration: none; }
/* 设置高度等于窗口高度 */
#root{
	height:100%;
}
/* 设置包裹层padding-bottom，使用公共页脚的页面,都要让出底部footer的高度，防止footer遮挡元素 */
#wrapper{
	position: relative;
  min-height: 100%;
  padding-bottom: 309px;
}

/* 全局覆盖popover组件样式，没办法的办法 */
.ant-popover-inner{
  border:1px solid rgba(187, 187, 187, 1);
  border-radius:0;
}
.ant-popover-inner-content{
	padding:0;
}
`;
