import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice";
// import darkmode from "./darkmode";



const store = configureStore({
     reducer:{
          auth : authSlice,
          // darkMode : darkmode
     }
})

export default store;
