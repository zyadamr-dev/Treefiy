import axios from "axios";

export const getTree = async () => {
    const configResponse = await axios.get("api/config");
    const config = configResponse.data;
    const query = new URLSearchParams(config).toString();
    const res = await axios.get(`api/tree?${query}`);
    return res.data;
};
