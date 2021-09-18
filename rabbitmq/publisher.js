const amqpConnection = require("./connection");
const uuid = require("uuid");

var correlationId;

exports.publish = async(email) => {
    return new Promise(async(resolve, reject) => {
        const connection = await amqpConnection.get();
        connection.createChannel(function(error1, channel) {
            if (error1) {
                console.log(error1);
                throw error1;
            }
            channel.assertQueue(process.env.QUEUE, {
                durable: false
            }, function(error2, q) {
                if (error2) {
                    throw error2;
                }
                correlationId = uuid.v4()
                console.log(' [.] Requesting random function with correlationId',correlationId);

                function consumeAndAckMessage (msg) {
                    if (!msg) return reject(Error.create('consumer cancelled by rabbitmq'));
                    let data = JSON.parse(msg.content.toString());
                    if (msg.properties.correlationId === correlationId && data.email === email) {
                        console.log(' [.] Got response from random function %s', msg.content.toString());
                        resolve(data.status);
                        channel.ack(msg)
                        channel.close();
                    }
                }
                
                channel.consume(q.queue, function(msg) {
                    consumeAndAckMessage(msg);
                });
                channel.sendToQueue(process.env.QUEUE,
                    Buffer.from(email), 
                    {
                        correlationId: correlationId,
                        replyTo: q.queue
                    }
                );
            });
        });
    })
}
