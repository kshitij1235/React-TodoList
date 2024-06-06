import axios from "axios";
import { useEffect, useState } from "react";

function FetchFromAPI(model: any, api_url: any) {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get(api_url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return data;
}

export default FetchFromAPI;
