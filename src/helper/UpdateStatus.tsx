import axios from "axios";

function UpdateStatus(id:any) {
    return axios
        .get(`http://localhost:3001/api/update_status/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("There was an error updating the status!", error);
            throw error;
        });
}

export default UpdateStatus;
