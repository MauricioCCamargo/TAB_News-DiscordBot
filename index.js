// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const requestify = require("requestify");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
let channel;

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  try {
    if (message.author.id != "bot id") {
    if (message.author.id != "bot id") {
      if (message.content.startsWith("%delete")) {
        channel = client.channels.cache.get(message.channelId);
        const comando = message.content;
        const quantidade = parseInt(comando.substring(8, comando.length));
        if (!isNaN(quantidade)) {
          channel.messages.fetch({ limit: quantidade }).then((msgs) => {
            msgs.forEach((msg) => {
              msg.delete();
            });
          });
        }
      } else if (
        message.content == "%tab_news" &&
        message.channelId == "channelid" //i wanted the news to be sent in specifcic channel
      ) {
        const lista = [];
        channel = client.channels.cache.get("channelid");
        channel = client.channels.cache.get("channelid");
        channel.messages.fetch({ limit: 50 }).then((msgs) => {
          msgs.forEach((element) => {
            lista.push(element.content);
          });

          requestify
            .get("https://www.tabnews.com.br/api/v1/contents")
            .then((res) => {
              const retornoJSON = res.getBody();

              retornoJSON.forEach((item) => {
                const link =
                  "https://www.tabnews.com.br/" +
                  item.owner_username +
                  "/" +
                  item.slug;
                if (!lista.includes(link)) {
                  channel.send(link);
                }
              });
            });
        });
      }
    }
  } catch (ex) {
    console.log(ex.message);
  }
});

client.login("TOKEN");
