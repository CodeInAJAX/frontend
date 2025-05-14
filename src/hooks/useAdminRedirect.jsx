import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAdminAuth from "./useAdminAuth";

const useAdminRedirect = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useAdminAuth();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login");
    }
  }, [isAdminLoggedIn, navigate]); 
};

export default useAdminRedirect;
