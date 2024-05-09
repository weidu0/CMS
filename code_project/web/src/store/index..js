import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    state: {
        isGetterRouter: false,
        isCollapsed: false,
        userInfo: {}
    },
    getters: {

    },
    mutations: {
        changGetterRouter(state, value) {
            state.isGetterRouter = value
        },
        changeCollapse(state) {
            state.isCollapsed = !state.isCollapsed
        },
        changeUserInfo(state, value) {
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state) {
            state.userInfo = {}
        }
    },
    actions: {

    },
    modules: {

    },
    plugins: [createPersistedState({
        paths: ["isCollapsed", "userInfo"]  //控制是不是要持久化，页面重新加载还在
    })],
})

export default store
