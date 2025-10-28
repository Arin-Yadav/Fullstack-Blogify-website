const Alert = ({ message, type }) => {
  const bgColor = type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  return (
    <div className={`p-2 rounded mb-4 ${bgColor}`}>
      {message}
    </div>
  );
};

export default Alert;
