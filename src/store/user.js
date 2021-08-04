export default {
	namespaced: true,
	state: {
		userInfo:{}
	},
	mutations: {
		updateUserInfo(state, info) {
			state.userInfo = info
		}
	}
}
