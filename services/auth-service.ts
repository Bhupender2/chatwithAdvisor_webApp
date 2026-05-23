import { API_GROUPS } from "@/lib/api-endpoints";
import { EmployeeData } from "@/types/auth";
import axios from "axios";

export const loginUser = async (employeeData: EmployeeData) => {
  const response = await axios.post(API_GROUPS.staffLogin, employeeData);
  return response.data; // returning response here
};
