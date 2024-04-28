/* eslint-disable no-case-declarations */
import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationDisplay(state, action) {
      return action.payload
    }
  }
})

export const { notificationDisplay } = notificationSlice.actions

export const setNotification = (message, type = "good", duration = 5) => {
  const notificationColor = type === "good" ? "green" : "red"
  const notificationId = type === "good" ? "notification" : "notification-error"
  const notificationStyle = {
    color: notificationColor,
    background: "lightgray",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    BorderColor: notificationColor,
    marginBottom: 10
  }
  const notificationPayload = {
    message: message,
    style: notificationStyle,
    id: notificationId
  }

  return async dispatch => {
    dispatch(notificationDisplay(notificationPayload))
    setTimeout(() => {
      dispatch(notificationDisplay(""))
    }, duration*1000)
  }
}

export default notificationSlice.reducer
