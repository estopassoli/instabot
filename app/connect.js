async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
      return global.connection
    }
    const mysql = require('mysql2/promise');
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
	//password:'12345678',
      database: 'instabot'
    });
    global.connection = connection;
    return connection;
  }
  
  exports.connect = connect;