import axios from "axios";
import qs from "qs";

// 配置请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 请求时携带token，前后端约定好叫accessToken，从缓存中拿取token放入请求头中
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["accessToken"] = token;
    } else {
      config.headers["accessToken"] = ""; //没有token时候，传空字符串
    }
    // 判断请求的类型
    // 如果是post请求就把参数拼到data里面（序列化），后端需用request.body注解接受请求体
    // 如果是get请求就拼到params里面
    if (config.method === "post") {
      let data = qs.parse(config.data);
      config.data = qs.stringify({
        ...data
      });
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 配置接收拦截器
axios.interceptors.response.use(
  function(response) {
    // 根据code码做登录状态依据，非常重要
    switch (response.data.code) {
      // 认证失败，说明token可能失效·过时·不存在等情况，此时清空缓存中的token并重定向到首页，此后以是否存在token作为判断是否登录的依据
      case 600:
        localStorage.clear();
        // 调试阶段暂时关闭重定向
        window.location.href = window.location.href.split("#")[0] + "#/home";
        break;
      default:
        //每次请求刷新使用新token
        localStorage.setItem("token", response.headers.accesstoken);
        break;
    }

    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axios;
