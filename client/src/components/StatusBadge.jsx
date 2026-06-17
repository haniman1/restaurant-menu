function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === "Available" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
