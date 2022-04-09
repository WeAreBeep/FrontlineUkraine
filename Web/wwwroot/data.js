var axios = axios || {}; //import axios from "axios";
var $countTweets = 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.get = function () {
        return axios.get(Settings.apiUrl)
            .then(function (response) {
            return response.data;
        }).catch(function (e) { return Help.handleErrors(e); });
    };
    return Data;
}());
//# sourceMappingURL=data.js.map