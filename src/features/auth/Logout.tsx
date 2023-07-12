import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { userLoggedOut } from "../user/userSlice";
import { useEffect } from "react";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLoggedOut());
    document.cookie =
      "current_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // cant use <Navigate> it needs to be returned, can't do that in useEffect
    navigate("/");
  }, [dispatch, navigate]);
  return <div>Logging out...</div>;
};
//
