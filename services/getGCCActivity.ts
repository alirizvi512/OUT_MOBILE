import { BASE_URL } from "@/constants/Services";
import { getSecureData } from "@/store";
import { IGCCActivity } from "@/types/IGCCActivity";
import axios, { AxiosRequestConfig } from "axios";

export const getGCCActivity = async (
    pageNumber: number,
    publicAddress: string,
    searchString: string = ""
) => {
    try {
        const token = await getSecureData("access_token");
        let url = `${BASE_URL}/pro/GetGccActivity?pagenumber=${pageNumber}&search=${searchString}&publicAddress=${publicAddress}`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            maxBodyLength: Infinity,
            method: "GET",
            url,
        };

        const response = await axios<IGCCActivity[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    return []
};
