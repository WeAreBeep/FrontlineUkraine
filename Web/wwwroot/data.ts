var axios = axios || {}; //import axios from "axios";

var $countTweets = 0; 

class Data {

    static get() {  
        return axios.get(Settings.apiUrl)
            .then(response => {
                return response.data;
            }).catch(e => Help.handleErrors(e));
    }
}