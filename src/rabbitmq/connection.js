const amqp = require('amqplib/callback_api');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const amqpConnection = function () {

    var _amqpConn = null;
    
    async function AMQPConnect() {
        try {
            return new Promise((resolve, reject) => {
                amqp.connect('amqp://localhost', (error, connection) => {
                    if(error) {
                        reject(error);
                    }
                    console.log(` [x] AMQP connected`);
                    resolve(connection);
                })
            })
        } catch (e) {
            setTimeout(AMQPConnect(), 10000);
        }
    }

    async function get() {
        try {
            await lock.acquire("AMQPClient", async () => {
                if (_amqpConn != null) {
                    console.log(` [x] Returned existing AMQP connection.`);
                    return _amqpConn;
                } else {
                    console.log(` [x] Creating new AMQP connection`);
                    _amqpConn = await AMQPConnect();
                }
            }, {});
            return _amqpConn;
        } catch (e) {
            return null;
        }
    }

    return {
        get: get
    }
}

module.exports = amqpConnection();