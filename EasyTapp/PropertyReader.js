var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('env/application.properties');

module.exports.getProperty=function(key){
    var property = properties.get(key);
    //var property = properties.path().key;
    return property;
 }