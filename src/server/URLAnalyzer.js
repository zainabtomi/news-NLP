const axios = require("axios");

const BASE_URL = "https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/examples";//but not working

const analyzeURL = async (url, key) => {
  let analyse = {};
  await axios
    .get(`${BASE_URL}?key=${key}&url=${url}&lang=en`)
    .then((response) => {
      const { data } = response;
      const { code } = data.status;
      if (code !== 0) {
        if (code === 100) {
          analyse = {
            error: `${data.status.msg}, API key or provided URL is invalid`,
          };
        } else {
          analyse = { error: data.status.msg };
        }
      } else {
        analyse = {
          score_tag: data.score_tag,
          agreement: data.agreement,
          subjectivity: data.subjectivity,
          confidence: data.confidence,
          irony: data.irony,
        };
      }
      return analyse;
    })
    .catch((error) => {
      console.log(error);
      analyse = { error: "MeaningCloud server error" };
      return analyse;
    });

  console.log("Analysis result:", analyse);
  return analyse;
};

module.exports = { analyzeURL };
