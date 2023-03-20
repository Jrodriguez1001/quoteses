const axios = require("axios").default;

//quotes

let category = ["love", "architecture", "dreams", "inspirational"];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

category = category[getRandom(0, category.length)];
const optionsq = {
  method: "GET",
  url: "https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes",
  params: { category: `${category}` },
  headers: {
    "X-RapidAPI-Key": "b9745ef22bmshae7468ba8174845p1081c8jsn3eac74ef179b",
    "X-RapidAPI-Host": "quotes-by-api-ninjas.p.rapidapi.com",
  },
};

const getQuote = async () => {
  try {
    const res = await axios.get(
      "https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes",
      optionsq
    );
    let quote = res.data[0].quote;
    return quote;
  } catch (error) {
    console.log(error);
    return `Hubo un error :c en obtener la frase :c`;
  }
};

/////

//translate

const translate = async () => {
  try {
    let dataquote = await getQuote();

    while (dataquote.length > 200) {
      dataquote = await getQuote();
    }

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "es");
    encodedParams.append("text", `${dataquote}`);
    const optionst = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",

      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "b9745ef22bmshae7468ba8174845p1081c8jsn3eac74ef179b",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const response = await axios.request(optionst);
    const response_es = response.data.data.translatedText;
    return { response_es, dataquote };
  } catch (error) {
    console.log(error);
    return `Hubo un error en la traducción :c`;
  }
};

module.exports = {
  getQuote,
  translate,
};
