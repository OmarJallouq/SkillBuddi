import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Delete = () => {
  const { deleteProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteFunction = async () => {
      try {
        const response = await deleteProfile();
        if (response) {
          toast.success("Successful Delete");
        } else {
          throw new Error(response.error || "Failed to Delete");
        }
      } catch (error) {
        toast.error(error);
      }
    };

    deleteFunction();
    navigate("/");
  }, []);

  return <div>DELETING...</div>;
};

export default Delete;
