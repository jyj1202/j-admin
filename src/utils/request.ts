import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import { ElMessage } from "element-plus";
import { checkStatus } from "@/utils/http";
import { useRouter } from "vue-router";
const router = useRouter()

const axiosBaseConfig = {
  timeout: 20000,
}

class HttpRequest {
  private instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create(axiosBaseConfig)
    this.initInterceptor()
  }

  public getInstance(): AxiosInstance {
    return this.instance
  }

  private initInterceptor() {
    this.instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    this.instance.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      const {data} = response
      // 和后端约定返回数据格式
      const {code} = data
      if (code == 401) {
        return Promise.reject('未登录')
      }
      if (code == 403) {
        return Promise.reject('未授权')
      }
      return data;
    }, function (error: AxiosError) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      const { response } = error;
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
    });
  }

  public get(url: string, config:AxiosRequestConfig={}) {
    return this.instance.get(url, config)
  }

  public post() {

  }

  public put<T=any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.put(url, data, config)
  }

  public delete() {

  }
}

export default new HttpRequest()
