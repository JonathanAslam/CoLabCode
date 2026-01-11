import axios from 'axios'
// create a api constant which we will use instead of axios calls to ensure all the api calls to the user db through backend store the jwt with http-only methods

const api = axios.create({
    // same base url that would have been at the front of the api call, 
        // example: const result = await axios.post('http://localhost:5001/api/auth/login', { email, password });
        // now becomes: const result = await api.post("/auth/login", { email , password });

  baseURL: import.meta.env.VITE_API_URL, // replaced at build from frontend folder's .env, not backend, use import instead of process because frontend cant recognize process
  withCredentials: true, // allow cookies (for JWT)

})

export default api;
