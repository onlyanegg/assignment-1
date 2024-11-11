import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export function User() {
  const { user, logout } = useContext(UserContext);

  if (!user) return null;

  return (
    <div className="user">
      <h3>
        Welcome,{" "}
        {user.user.first_name && user.user.last_name
          ? `${user.user.first_name} ${user.user.last_name}`
          : user.user.email}
        !
      </h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
