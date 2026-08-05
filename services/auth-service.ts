import { API_GROUPS } from "@/lib/api-endpoints";
import { useAuthStore } from "@/store/auth-store";
import { EmployeeData } from "@/types/auth";
import axios from "axios";

export const loginUser = async (employeeData: EmployeeData) => {
  const response = await axios.post(API_GROUPS.staffLogin, employeeData);
  return response.data; // returning response here
};

export const logoutUser = async () => {
  const accessToken = useAuthStore().accessToken;
  const response = await axios.post(
    API_GROUPS.logout,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
