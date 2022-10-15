var mysql = require('mysql');
var fs    = require('fs');

module.exports = Logger;

function Logger(config) {
  this.levels = ['error', 'warn', 'info'];

  this.debugLevel = config.debugLevel || 'info';
  this.consoleLog = config.consoleLog || true;
  this.fileLog = config.fileLog || true;
  this.filename = config.filename || undefined;
  this.mySQLLog = config.mySQLLog || false;
  this.mySQLOptions = config.mySQLOptions || undefined;

  if (this.mySQLLog) {
    this.mySQLConnection = mysql.createConnection(this.mySQLOptions);
    this.mySQLConnection.connect(function(err) {
      if(err) {
        //error occured while connecting to the mysql database
        console.log(err);
      }
    });
  }
}

Logger.getDateTime = function() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

  return dateTime;
}

Logger.logToConsole = function(level, message) {
  console.log(level + ': ' + message);
}

Logger.logToFile = function(filename, level, message) {
  fs.exists(filename, function(exists) {
    
    if (exists) {
      var dateTime = Logger.getDateTime();
      var logMsg = '[' + dateTime + '] ' + level + ': ' + message + '\n';
      fs.appendFileSync(filename, logMsg);
    }

  });
}

Logger.logToMySQL = function(connection, table, level, message) {
  var dateTime = Logger.getDateTime();

  connection.query("INSERT INTO " + table + " SET ?", {level: level, message: message, date: dateTime}, function(err, result){
    if (err) {
      //throw err;
      return;
    }
  });
}

Logger.prototype.log = function(msg) {
  if ( this.levels.indexOf(msg.level) >= this.levels.indexOf(this.debugLevel) ) {

    if (this.consoleLog) {
      Logger.logToConsole(msg.level, msg.message);
    }

    if (this.mySQLLog) {
      Logger.logToMySQL(this.mySQLConnection, this.mySQLOptions.table, msg.level, msg.message);
    }

    if (this.fileLog) {
      Logger.logToFile(this.filename, msg.level, msg.message);
    }

  }
}

Logger.prototype.error = function(msg) {
  var message = {
    level: 'error',
    message: msg.message
  };
  this.log(message);
}

Logger.prototype.warn = function(msg) {
  var message = {
    level: 'warn',
    message: msg.message
  };
  this.log(message);
}

Logger.prototype.info = function(msg) {
  var message = {
    level: 'info',
    message: msg.message
  };
  this.log(message);
}

Logger.prototype.destroy = function() {
  if(this.mySQLConnection) {
    this.mySQLConnection.end(function(err) {
      if(err) {
        //error occured while closing the connection to mysql database
        console.log(err);
      } else {
        //Logger object destroyed
      }
    });
  }
};