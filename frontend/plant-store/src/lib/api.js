import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "",
  withCredentials: false
});



export async function fetchPlants(params = {}) {
  const res = await API.get("api/plant", { params });
  return res.data;
}

export async function createPlant(payload) {
  const res = await API.post("api/plant", payload);
  return res.data;
}




export default API;
