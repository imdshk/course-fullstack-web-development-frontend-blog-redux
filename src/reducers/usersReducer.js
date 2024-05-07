import { createSlice } from "@reduxjs/toolkit"

import usersService from "../services/users"

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    }
  }
})

export const { setAllUsers } = userSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers()
    dispatch(setAllUsers(users))
  }
}

export default userSlice.reducer