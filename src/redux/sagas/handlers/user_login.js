import { call, put, delay } from "redux-saga/effects";
import { requestPostSign_In, requestPostSign_Up } from "../requests/user_login";
import { sign_in_reducer, sign_in_error_message } from "../../actions/index";
import { socket } from "../../../socket";

export function* postSign_Up(action) {
  if (action.data.password.length >= 8) {
    try {
      const response = yield call(requestPostSign_Up, action.data);

      if (response.data.confirm == "registered") {
        action.data.history.push("/login_page");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("minimum length required");
  }
}
export function* postSign_In(action) {
  try {
    const response = yield call(requestPostSign_In, action.data);
    const { data } = response;
   
    socket.emit("setUserId", { userId: data.user.id });
    localStorage.setItem("for_reducer", JSON.stringify(response.data));
    localStorage.setItem("authorization", response.data.token);
    yield put(sign_in_reducer(data));
    if (data.status) {
      action.data.history.push("/");
    }
  } catch (error) {
    console.log(error.response.data);
    if(!error.response.data.status){
      yield put(sign_in_error_message(error.response.data));
    }
  }
}
export function* getSign_In(action) {
  try {
    yield put(sign_in_reducer(action.data));
  } catch (error) {
    console.log(error);
  }
}
