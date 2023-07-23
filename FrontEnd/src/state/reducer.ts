import { combineReducers } from "redux";
import service from "./Service/slice";
import booking from "./Booking/slice";
import AuthSlice from "./Auth/slice";
const rootReducer = combineReducers({
  service,
  booking,
  AuthSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
