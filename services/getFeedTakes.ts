import { BASE_URL } from "@/constants/Services";
import { getSecureData } from "@/store";
import { ITake } from "@/types/Itake";
import axios, { AxiosRequestConfig } from "axios";

export const getFeedTakes = async (pageNumber: number) => {
    try {
        const url = `${BASE_URL}/bro/GetTakesFeed?pagenumber=${pageNumber}`;
        const token = await getSecureData("access_token");
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            maxBodyLength: Infinity,
            method: "GET",
            url,
        };

        const response = await axios<ITake[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    return []
}