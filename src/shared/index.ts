import store from "./store";

class Shared {
  /**
   * 获取 Token
   */
  public getToken(): string {
    const state = store.getState();
    console.log(state);
    return state.token || "";
  }

  /**
   * 设置 Token
   */
  public setToken(token: string): void {
    // 将 token 的值记录在 store 中
    console.log(token);
    store.dispatch({
      type: "SET_TOKEN",
      payload: token,
    });
  }
}

const shared = new Shared();
export default shared;
