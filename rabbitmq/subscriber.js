const helperServie = require("../service/helper");
const amqpConnection = require("./connection");

async function subscriber(){
    try{        
        const connection = await amqpConnection.get();
        connection.createChannel(function(error1, channel) {
            if (error1) throw error1;
            const queue = process.env.QUEUE;
            channel.assertQueue(queue, {
                durable: false
            });
            channel.prefetch(1);
            console.log(' [x] Awaiting RPC requests');
            channel.consume(queue, function reply(msg) {
                const email = msg.content.toString();
                console.log(` [.] Executing random function`);
                const status = helperServie.randomCheckService();
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(
                        JSON.stringify({
                            status : status,
                            email : email
                        })
                    ),
                    {
                        correlationId: msg.properties.correlationId,
                        email : email
                    }
                );
                channel.ack(msg);
            });
        });
    }catch(err){
        throw err
    }
}

subscriber();