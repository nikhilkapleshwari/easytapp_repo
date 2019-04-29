var mailSender=require('./MailSender');


module.exports.verifyAccount=function(req,res){
    body=req.body;
    //console.log("body:"+JSON.stringify(body));
    userName=JSON.stringify(body.userName).replace(/['"]+/g, '');
    vCode=JSON.stringify(body.vCode).replace(/['"]+/g, '');
    
    var subject="Greetings from EasyTapp";
    var msg='<h3>Hi '+userName+',</h3><br>Your verification code for EasyTapp account is: <b>'+vCode+'</b>';
    
    var ans=mailSender.send(userName,subject,msg);
    //console.log('got ans!');
    res.end(JSON.stringify("0"));     
 }

 module.exports.sendTorrentMail=function(req,res){
    body=req.body;
   // //console.log('body:'+JSON.stringify(body));
    var msg=JSON.parse(JSON.stringify(body)).msg;
    var userName=JSON.parse(JSON.stringify(body)).userName;
    //console.log('msg:'+msg+","+userName);
    var subject="Torrent notification from EasyTapp";
    var msg1="<html><body><a href=\"magnet:?xt=urn:btih:acdd283667fbabfcf5165c8c5350786e6fc2a02d&dn=Sacred+Games+2018++Hindi+S01EP08+%28Yayati%29+720p+NetFlix+x264+DDP+&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969\">Inside.the.Real.Narcos.S01.WEBRip.x264-ION10</a></body></html>"
    var msg2="<html><body><a href=\"www.google.com\">Google</a></body></html>";
    var mailContent="<html><body>"+msg+"</body></html>";                                                                            
    //var notifierMsg='<h3>Hi '+userName+',</h3><br>New torrents available for your saved search: <b>'+msg+'</b><br>Login to <a href="http://theindependentdeveloper.com/easytapp">EasyTapp</a> for accessing magnet link';
    var notifierMsg='<h3>Hi '+userName+',</h3><br>New torrents available for your saved search: <b>'+msg+'</b><br>Login to <a href="http://139.59.59.19:3001/login">EasyTapp</a> for accessing magnet link';
    var ans=mailSender.send(userName,subject,notifierMsg);
    res.end('Mail sent!');
 }

 module.exports.sendForgotPwdMail=function(req,res){
   body=req.body;
   var token=JSON.parse(JSON.stringify(body)).token;
   var userName=JSON.parse(JSON.stringify(body)).userName;
   var subject="Forgot password link from EasyTapp";
   var link="http://139.59.59.19:3001/forgotpwd?token="+token;
   //var link="http://139.59.59.19:3001/forgotpwd";
   //var link="http://localhost:3001/forgotpwd?token="+token;
   console.log('link:'+link);
   var notifierMsg='<h3>Hi '+userName+',</h3><br>Please click on reset password link<br><a href="'+link+'">Reset password</a>';
   var ans=mailSender.send(userName,subject,notifierMsg);
   res.end('Mail sent!');
}
 
 