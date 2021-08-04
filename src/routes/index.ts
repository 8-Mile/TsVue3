import Router from 'vue-router'
import Login from "@/views/login/index.vue"
import Home from "@/views/home/index.vue"
import List from "@/views/data-list/index.vue"
const routes = [
	{
		path: "/login",
		name: "Login",
		meta: { withoutLayout: true },
		component: Login
	},
	{
		path: "/home",
		name: "Home",
		component: Home
	},
	{
		path: "/data-list",
		name: "dataList",
		component: List
	},
]

// const routerPush = Router.prototype.push
const routerPush = Router.prototype.push
console.log(location,'222')

Router.prototype.push = function push(location) {
	return (routerPush.call(this, location) as any).catch()
}
export default routes;
