import { BASE_URL } from "@/constants/Services";
import { getSecureData } from "@/store";
import { IGCCHoldings } from "@/types/IGCCHoldings";
import axios, { AxiosRequestConfig } from "axios";

export const getGCCHoldings = async (
    pageNumber: number,
    publicAddress: string,
    searchString: string = ""
) => {
    try {
        const token = await getSecureData("access_token");
        let url = `${BASE_URL}/pro/GetGccHoldings?pagenumber=${pageNumber}&search=${searchString}&publicAddress=${publicAddress}`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            maxBodyLength: Infinity,
            method: "GET",
            url,
        };

        const response = await axios<IGCCHoldings[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    return []
};
