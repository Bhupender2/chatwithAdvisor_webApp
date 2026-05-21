import { API_GROUPS } from "@/lib/api-endpoints";
import axios from "axios";

export const loginUser = async () => {
  const response = await axios.post(API_GROUPS.staffLogin, {});
  return response.data; // returning response here
};
