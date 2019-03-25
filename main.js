//引入vue
import Vue from 'vue';

//引入vue-router路由组件
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//引入Mint-ui
import MintUi from 'mint-ui';
Vue.use(MintUi);

import './static/mui/dist/css/mui.css';
//引入axios
import Axios from 'axios';
//添加请求拦截
Axios.interceptors.request.use(function(config) {
	//在发送请求之前要做的
	MintUi.Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return config;
}, function(error) {
	//对请求错误查理
	return Promise.reject(error);
});

//添加响应拦截器
Axios.interceptors.response.use(function(response) {
	MintUi.Indicator.close();
	//对响应数据的处理
	return response;
}, function(error) {
	//对响应错误的处理
	return Promise.reject(error);
});

Vue.prototype.$ajax = Axios;

//引入自己编写的组件
import App from './components/app.vue';
import Home from './components/home/index.vue';
import Information from './components/information/index.vue';
import Shopcar from './components/shopcar/index.vue';
import Setting from './components/setting/index.vue';


//配置路由
let router = new VueRouter();
router.addRoutes([{
	name: 'default',
	path: '',
	redirect: {
		name: 'home'
	}
}, {
	name: 'home',
	path: '/home',
	component: Home
}, {
	name: 'information',
	path: '/information',
	component: Information
}, {
	name: 'shopcar',
	path: '/shopcar',
	component: Shopcar
}, {
	name: 'setting',
	path: '/setting',
	component: Setting
}]);

new Vue({
	el: "#app",
	router: router,
	render: (c) => {
		return c(App);
	}
})