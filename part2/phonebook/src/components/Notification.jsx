const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  } else {
    return (
      <div
        className={type === "error" ? "error-message" : "confirmation-message"}
      >
        {message}
      </div>
    );
  }
};

export default Notification;
