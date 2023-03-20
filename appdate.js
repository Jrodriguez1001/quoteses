const venom = require("venom-bot");
const { translate } = require("./quotes.js");
const cron = require("node-cron");

venom
  .create(
    "sessionName",
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error("Invalid input string");
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], "base64");

      var imageBuffer = response;
      require("fs").writeFile(
        "out.png",
        imageBuffer["data"],
        "binary",
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

let adj = [
  "Buenos dias amor",
  "Hola cariño",
  "Buenos dias mi vida",
  "Wenas wenas",
];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


async function start(client) {
  cron.schedule(`${getRandom(12,39)} 7 * * *`, async () => {
    const chatid = "51968916413@c.us";

    try {
      const quotetrans = await translate();
      const adjIndex = getRandom(0, adj.length);
      const message = `${adj[adjIndex]}, hoy quiero dedicarte esta frase 😍 "${quotetrans.response_es}" te la paso en inglés a modo de práctica 😁 "${quotetrans.dataquote}"`;

      const result = await client.sendText(chatid, message);
      console.log("Resultado: ", result); // retorna el objeto con éxito
    } catch (error) {
      console.error("Error al enviar: ", error); // retorna el objeto con error
    }
  });
}
