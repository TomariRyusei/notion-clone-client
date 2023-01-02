import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1";

// JWTトークン取得
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIリクエスト前処理
axios.interceptors.request.use(async (config) => {
  return {
    config,
    // リクエスト前にJWTトークンを認証情報として付与
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

// APIレスポンス受領時処理
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    if (!error.response) {
      return alert(error);
    }
    throw error.response;
  }
);

export default axiosClient;
