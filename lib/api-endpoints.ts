const BASE_URL = process.env.NEXT_PUBLIC_API_BASE; //"https://lms.neetadvisor.in/api/v1"

export const API_GROUPS = {
  staffLogin: `${BASE_URL}/staffLogin`,
  getDefaultGroup: `${BASE_URL}/conversation/getAlertConversations`,
  getPreviousChat: `${BASE_URL}/chat/getPreviousChat`,
};
