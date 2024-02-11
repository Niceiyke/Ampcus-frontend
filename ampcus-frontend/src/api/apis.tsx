import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";



export const getMember = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/member/${id}`)
    console.log(response.data)

    return response.data
}

export const loanRequest = async (data) => {
    const response = await axiosInstance.post('/loans/', data)
    return response.data
}