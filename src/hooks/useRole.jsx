import { useState } from "react";

const useRole = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole === role ? "" : selectedRole);
  };

  return { role, handleRoleChange };
};

export default useRole;
