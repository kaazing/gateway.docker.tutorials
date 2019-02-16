const stompit = require("stompit");

const getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

const brokerHost = "activemq";
const brokerPort = "61613";
const topicName = "/topic/stocks";

// Each message will be sent between minTickerTime and maxTickerTime.
const minTickerTime = 100; // milliseconds
const maxTickerTime = 300; // milliseconds

const stocks = [
  {
    symbol: "ORCL",
    name: "Oracle Corporation",
    price: 49,
    numShares: 3897959183
  },
  { symbol: "GOOG", name: "Alphabet Inc.", price: 988, numShares: 680976430 },
  {
    symbol: "ADBE",
    name: "Adobe Systems Incorporated",
    price: 124,
    numShares: 476744186
  },
  {
    symbol: "ATVI",
    name: "Activision Blizzard Inc.",
    price: 59,
    numShares: 1372881355
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 16,
    numShares: 937500000
  },
  { symbol: "FB", name: "Facebook Inc.", price: 206, numShares: 2110000000 },
  { symbol: "AKAM", name: "Akami", price: 77, numShares: 168831168 },
  { symbol: "GDDY", name: "GoDaddy Inc.", price: 76, numShares: 157894736 },
  { symbol: "AAPL", name: "Apple Inc", price: 191, numShares: 4837696335 }
];

const sendTickerMessage = client => {
  // Pick a random stock.
  const stockIndex = getRandomIntInclusive(0, stocks.length - 1);
  const stock = stocks[stockIndex];

  // Randomly change the price by a percentage
  let priceChangeRatio = Math.random() / 10;
  if (priceChangeRatio === 0) {
    priceChangeRatio = 0.1;
  }

  // Decide whether to add or subtract to current price
  if (!stock.trendUp) {
    stock.price = stock.price - stock.price * priceChangeRatio; // Change the price
  } else {
    stock.price = stock.price + stock.price * priceChangeRatio; // Change the price
  }

  // If price hits a bound then reverse trend
  if (stock.trendUp && stock.price > stock.upperBound) {
    stock.price = stock.upperBound;
    stock.trendUp = false;
  } else if (!stock.trendUp && stock.price < stock.lowerBound) {
    stock.price = stock.lowerBound;
    stock.trendUp = true;
  } else {
    // Sometimes randomly change the trend
    if (Math.random() > stock.trendChangePropensity) {
      stock.trendUp = !stock.trendUp;
    }
  }

  const message = {
    symbol: stock.symbol,
    name: stock.name,
    price: stock.price,
    marketCap: Math.floor((stock.price * stock.numShares) / 1000000000)
  };

  // console.log(JSON.stringify(message));

  const frame = client.send({ destination: topicName });
  frame.write(JSON.stringify(message));
  frame.end();

  // Schedule the next message at a future random interval.
  setTimeout(function() {
    sendTickerMessage(client);
  }, getRandomIntInclusive(minTickerTime, maxTickerTime));
};

const delayStartTimeSeconds = 2;
console.log("\n-------------------------------------------\n");
console.log(`Starting publisher in ${delayStartTimeSeconds} seconds\n`);

setTimeout(() => {
  console.log(`Broker address: ${brokerHost}:${brokerPort}`);
  console.log(`Topic:          ${topicName}`);
  console.log("Connecting...");

  // Loop through and randomly assign trends and bounds to stocks
  stocks.forEach(stock => {
    stock.trendUp = Math.random() > 0.5;
    stock.lowerBound = Math.floor(stock.price / 1.5);
    stock.upperBound = Math.floor(stock.price * 1.5);
    stock.trendChangePropensity = 0.75 + Math.random() / 4;
    // console.log(
    //   `${stock.symbol}, trendUp=${stock.trendUp}, lowerBound=${
    //     stock.lowerBound
    //   }, upperBound=${stock.upperBound}, trendChangePropensity=${
    //     stock.trendChangePropensity
    //   }`
    // );
  });

  stompit.connect(
    { host: brokerHost, port: brokerPort },
    (err, client) => {
      if (err) {
        if (err.code === "ECONNREFUSED") {
          // Broker hasn't started yet. Exit
          console.log("Can't connect to broker. Is it running?\n");
        } else {
          console.log("Got an error:");
          console.log(err);
        }
        return;
      } else {
        console.log("Connected.");
        console.log("Publishing data. (No log output will be shown here.)");
        sendTickerMessage(client);
        // client.disconnect();
      }
    }
  );
}, delayStartTimeSeconds * 1000);
