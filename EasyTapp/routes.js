module.exports = function(app){
    var reqCon = require('./controller/RequestController');
    app.post('/search', reqCon.search);
    app.post('/schedule',reqCon.schedule);
    app.post('/listTorrents',reqCon.listTorrents);
    app.post('/getTorrentUpdate',reqCon.getTorrentUpdate);
    app.post('/verifyAccount',reqCon.verifyAccount);
    app.post('/sendTorrentMail',reqCon.sendTorrentMail);
    app.post('/sendForgotPwdMail',reqCon.sendForgotPwdMail);
}