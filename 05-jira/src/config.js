const apiUrl_pro = "";
const apiUrl_dev = "http://localhost:5059";
export const apiUrl =
  process.env.NODE_ENV === "production" ? apiUrl_pro : apiUrl_dev;
