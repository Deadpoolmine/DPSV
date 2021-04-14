import * as API from "./API";

function PostRequest(data, api, callback) {
    //!一定要移除Header 
    // https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server
    const requestOptions = {
        method: 'POST',
        body: data
    };
    for (var key of data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    /* 测试成功 */
    console.log(API.API_BASE + api);
    fetch(api, requestOptions)
        .then((res) => {
            return res.json();
        }).then((data) => {
            data = JSON.stringify(data).replace(/\'/gi,'')
            callback(JSON.parse(data))  
        })
}

/**
 *
 *
 * @param {Array} params
 * @param {string} api
 * @param {Function} callback
 */
function GetRequest(params, api, callback) {
    api = api.split("/");
    console.log(api);
    var paramsNum = api.length - 2;
    console.log(paramsNum);
    console.log(params.length);
    if(params.length !== paramsNum){
        alert("GET参数错误");
        return;
    }
    const baseAPI = "/" + api[1];
    var finalAPI = baseAPI;
    for (let i = 0; i < params.length; i++) {
        const param = params[i];
        finalAPI += ("/" + param);
    }
    fetch(finalAPI).then(res => {
            return res.json();
        }).then(data => {
        data = JSON.stringify(data).replace(/\'/gi,'')
        callback(JSON.parse(data))  
    });
}

export {PostRequest, GetRequest} ;