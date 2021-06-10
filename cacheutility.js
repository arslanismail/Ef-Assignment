const redisClient = require("./redis-client");

const get = async (req, res, next) => {
  
  const rawData = await redisClient.getAsync(req.originalUrl);
  if (rawData !== null) {
    console.log("Sent Cached Response");
    res.status(200).send(JSON.parse(rawData));
  } else next();
};

const set = (key, value) => {
  redisClient.setAsync(key, JSON.stringify(value), "ex", 242);
};

const del = (key) =>{
    redisClient.delAsync(key)
}

module.exports = {
  getCache: get,
  setCache: set,
  delCache: del
};
