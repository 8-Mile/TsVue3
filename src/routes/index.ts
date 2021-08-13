import Router from 'vue-router'
import Login from "@/views/login/index.vue"
import Home from "@/views/home/index.vue"
import List from "@/views/data-list/index.vue"
import listTwo from '@/views/data-list/listTwo.vue'
import charts from '@/views/charts/index.vue'
import peopleCharts from '@/views/charts/peopleCharts.vue'
import text from '@/views/text/index.vue'
const routes = [
	{
		path: "/login",
		name: "Login",
		meta: { withoutLayout: true },
		component: Login
	},
	{
		path: "/home",
		name: "首页",
		component: Home
	},
	{
		path: "/data-list",
		name: "列表页",
		component: List
	},
	{
		path: "/data-list/listTwo",
		name: "列表页2",
		component: listTwo
	},
	{
		path: "/charts",
		name: "图表",
		component: charts
	},
	{
		path: "/charts/peopleCharts",
		name: "人物关系图",
		component: peopleCharts
	},
	{
		path: "/text",
		name: "备注",
		component: text
	},
]

// const routerPush = Router.prototype.push
const routerPush = Router.prototype.push
console.log(location,'222')

Router.prototype.push = function push(location) {
	return (routerPush.call(this, location) as any).catch()
}
export default routes;
