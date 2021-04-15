const KEY_USERNAME = 'username';
const KEY_PASSWORD = 'password';
const KEY_AVATAR = 'avatar';
const KEY_THEME = 'theme';

function GetItem(key) {
    return localStorage.getItem(key);
}

function SetItem(key, value){
    localStorage.setItem(key, value);
}

function ClearItems() {
    localStorage.clear();
}

function RemoveItem(key) {
    localStorage.removeItem(key);
}

function getBase64 (file) {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}

export {
    KEY_USERNAME,
    KEY_PASSWORD,
    KEY_AVATAR,
    KEY_THEME,

    GetItem, 
    SetItem, 
    ClearItems,
    RemoveItem,
    getBase64,
    urltoFile
}