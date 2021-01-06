import { useState } from 'react';

export default function useRole() {
  const getRole = () => {
    const RoleString = localStorage.getItem('role');
    const userRole = JSON.parse(RoleString);
    return userRole;
  };

  const [role, setRole] = useState(getRole());

  const saveRole = userRole => {
    localStorage.setItem('role', JSON.stringify(userRole));
    setRole(userRole.Role);
  };

  return {
    setRole: saveRole,
    role
  }
}