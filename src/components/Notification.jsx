import { useSelector } from "react-redux"

const Notification = () => {
  const notificationPayload = useSelector(state => state.notification)
  if (notificationPayload !== "") {
    return (
      <div
        style={notificationPayload.style}
        id={notificationPayload.id}
      >
        {notificationPayload.message}
      </div>
    )
  } else {
    <>
    </>
  }
}

export default Notification