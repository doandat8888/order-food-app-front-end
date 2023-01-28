import axios from "../axios";

const api = process.env.API_URL

const getAllFood = () => {
    return axios.get(`api/v1/get-all-food`);
}

export default {
    getAllFood
}