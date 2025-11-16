import { useEffect } from "react";
import { useCall } from "../context/CallContext";

function UserCard({ email }) {
  const { callUser } = useCall();

  useEffect(() => {
    console.log("UserCard mounted for:", email);
  },[]);

  return (
    <div className="flex items-center gap-2">
      {/* <span>{email}</span> */}
      <button
        onClick={() => callUser(email)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Call
      </button>
    </div>
  );
}

export default UserCard;
