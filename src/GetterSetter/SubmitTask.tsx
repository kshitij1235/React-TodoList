import axios from "axios";

const SubmitTask = (formData: any) => {
    axios.post('http://localhost:3001/api/tasks', formData)
        .then(response => {
            console.log('Data submitted successfully:', response.data);
            window.location.reload(); // Reload the page
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
};


export default SubmitTask;