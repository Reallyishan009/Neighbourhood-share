import axios from 'axios'


const apiClient = axios.create({
     baseURL : "https://neighbourhood-share-eight.vercel.app/api",
     timeout : 10000,
     headers : {
        'Content-Type' : 'application/json',
     }
    }
)

export default apiClient;

//axios instance