var properties = require('../properties');
var request = require('../utils/request');
var md5 = require('md5');

exports.login = function (mail, password, cb) {

    request({
        url: properties.endpoint + "/cli/login",
        method: "GET",
        public: true,
        headers: {
            'user': mail,
            'pass': md5(password),
        }
    }, function (error, body) {
        cb(error, body);
    });

}