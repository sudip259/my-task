import axios from "axios";

const baseUrl = "https://oriflame.softbenz.com/api";

const getData = async () => {
  const response = await axios.get(
    `${baseUrl}/product/for-public/oncolour-nail-polish-4`
  );
  return response;
};

const apiService = { getData };
export default apiService;
