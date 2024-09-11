const { default: axios } = require("axios");

const fetchData = async () => {
  const response = await axios.get(
    "https://livethreatmap.radware.com/api/map/attacks?limit=10"
  );

  return response;
};

const liveThreatConnector = {
  fetchData,
};

module.exports = liveThreatConnector;
