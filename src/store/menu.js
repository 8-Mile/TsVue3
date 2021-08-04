export default {
	namespaced: true,
	state: {
		sysId:'',
		menuId:''
	},
	mutations: {
		updateSysId(state, id) {
			state.sysId = id
		},
		updateMenuId(state, id) {
			state.menuId = id
		}
	}
}
