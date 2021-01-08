// These exports are for localhost
var exports_1 = {
    'client-domain': 'http://localhost:3001/',
    'server-domain': '//localhost:3000/'
};

// These exports are for uploading to heroku
var exports_remote = {
    'client-domain': '//localhost:3001/',
    'server-domain': '//localhost:3000/'
};

var exports_final = {
    'client-domain': 'https://caro-online-client.firebaseapp.com/',
    'server-domain': 'https://caro-online-api-client.herokuapp.com/'
};

export default exports_final;