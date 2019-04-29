const { parse } = require('querystring')
var SearchModel=require('../model/searchModel');
var torrentSearchModule=require('../util/TorrentSearchModule');
var torrentScheduleModule=require('../util/TorrentScheduleModule');
var torrentDashboardModule=require('../util/TorrentDashboardModule');
var torrentUpdateModule=require('../util/TorrentUpdateModule');
var accountManage=require('../util/AccountManage');
  //*********************************** */


exports.search = function(req,res) {
    torrentSearchModule.search(req,res);
};

exports.schedule=function(req,res){
  torrentScheduleModule.schedule(req,res);
}

exports.listTorrents=function(req,res){
  torrentDashboardModule.getTorrentList(req,res);
}

exports.getTorrentUpdate=function(req,res){
  torrentUpdateModule.getTorrent(req,res);
}

exports.verifyAccount=function(req,res){
  accountManage.verifyAccount(req,res);
}

exports.sendTorrentMail=function(req,res){
  accountManage.sendTorrentMail(req,res);
}

exports.sendForgotPwdMail=function(req,res){
  accountManage.sendForgotPwdMail(req,res);
}
