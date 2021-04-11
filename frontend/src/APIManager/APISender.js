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
    console.log(API.API_BASE + api);
    fetch(api, requestOptions)
        .then(response => {
            callback(response);
        })
}

export {PostRequest} ;