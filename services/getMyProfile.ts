import { BASE_URL } from "@/constants/Services";
import { getSecureData } from "@/store";
import { IProfile } from "@/types/IProfile";
import axios, { AxiosRequestConfig } from "axios";

export const getMyProfile = async (refCode: string = "") => {
    let url = "";
    if (refCode === "") {
        url = `${BASE_URL}/pro/GetMyProfile`
    } else {
        url = `${BASE_URL}/pro/GetMyProfile?refLink=${refCode}`
    }
    const token = await getSecureData("access_token");
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxBodyLength: Infinity,
        method: "GET",
        url,
    };

    const response = await axios<IProfile>(config);
    return response.data;
}