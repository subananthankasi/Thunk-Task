import { configureStore } from "@reduxjs/toolkit";
import { createUserReducer } from "./Slice/CreateSlice";
import { readReducer } from "./Slice/ReadSlice";
import { DeleteReducer } from "./Slice/DeleteSlice";
import { UpdateReducer } from "./Slice/UpdateSlice";


export const store = configureStore({
    reducer:{
      createData :createUserReducer,
      getData:readReducer,
      deleteData:DeleteReducer,
      updateData:UpdateReducer
    }
})