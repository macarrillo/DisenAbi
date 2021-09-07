import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
  };
const requestGenerico = {
    get:(url:string) => axios.get(url),
    post:(url:string,body:any) => {
        let data = JSON.stringify(body);
        console.log('DATAAA:',data);
        return axios.post(url,data,axiosConfig)
    },
    put:(url:string,body:any) => axios.put(url,body),
    delete:(url:string) => axios.delete(url),
}
export default requestGenerico;