import axios from 'axios'


const apiClient = axios.create({
     baseURL : "http://localhost:500/api",
     timeout : 10000,
     headers : {
        'Content-Type' : 'application/json',
     }
    }
)

export default apiClient;

//axios instance