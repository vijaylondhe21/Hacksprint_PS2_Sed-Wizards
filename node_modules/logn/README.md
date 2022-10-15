#logn

Logging module for node

##Inspiration

The idea behind creating this module was to equip developers with the ability to log errors in a efficient yet simple manner. This module provides enough flexibility to log errors and warnings or even useful information as per required.

Also the need arised in the process of creating an API for the scoreboard web application (still under development).

##Logs to

As of now the following logging trasports are supported

    MySQL database
    File
    Console

##Dependencies

    mysql - mysql driver for node

##Usage

The node-log module can be used by creating a new instance of Logger.

``` js
  var logn = require('logn');

  var logger = new logn.createLogger({
    debugLevel: 'error',
    consoleLog: true, //whether to log messages to console
    fileLog: true,  //whether to log messages to file
    filename: 'appname.log',  //location of the file
    mySQLLog: true, //whether to log messages to MySQL database
    //mysql options
    mySQLOptions: {
      host: 'host', //host for MySQL database
      user: 'username',
      password: 'password',
      database: 'databasename',
      table: 'tablename'
    }
  });
```

Now you can use the `logger` object to log the errors.

``` js
  // using the generic log method
  logger.log('warn', 'Logging to console, file and mysql.');

  // using specific methods, ie. error(), warn() and info()
  logger.warn('Logging using the warn method.');
```

A datetime stamp is automatically added while logging messages to MySQL and file.

Make sure that you destroy the connection to the MySQL database(not required if the `mySQLLog` config option is set to false).

``` js
  //ends the connection to the MySQL database, if one was made
  logger.destroy();
```

##Other logging modules for node

[winston](https://github.com/flatiron/winston)


##Contribute

Feel free to contribute pull requests.

Contact me at abhikandoi2000@gmail.com
or tweet me @kandoiabhi