var cache = require('persistent-cache');
var globals = cache();

module.exports = (args, options, logger) => {
    logger.info('✔ Success!');

    var myJSON = globals.getSync("token");
    logger.info(myJSON);

}