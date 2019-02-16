const stompit = require("stompit");

stompit.connect({ host: "kaazing.example.com", port: 61613 }, (err, client) => {
  console.log('Subscribed...');
  client.subscribe({ destination: "/topic/stocks" }, (err, msg) => {
    msg.readString("UTF-8", (err, body) => {
      console.log(body);
      // client.disconnect();
    });
  });
});
