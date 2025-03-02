const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const config = require("./config.js");
const fs = require("fs");
const client = new Client({
  partials: [
	Partials.Channel, // for text channel
	Partials.GuildMember, // for guild member
	Partials.User, // for discord user
  ],
  intents: [
	GatewayIntentBits.Guilds, // for guild related things
	GatewayIntentBits.GuildMembers, // for guild members related things
	GatewayIntentBits.GuildIntegrations, // for discord Integrations
	GatewayIntentBits.GuildVoiceStates, // for voice related things
  ],
});

client.config = config;
client.language = config.language || "en";
let lang = require(`./languages/${config.language || "en"}.js`);

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
	if (!file.endsWith(".js")) return;
	const event = require(`./events/${file}`);
	let eventName = file.split(".")[0];
	console.log(`${lang.loadclientevent}: ${eventName}`);
	client.on(eventName, event.bind(null, client));
	delete require.cache[require.resolve(`./events/${file}`)];
  });
});


client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
	try {
		if (f.endsWith(".js")) {
			let props = require(`${config.commandsDir}/${f}`);
			if (props.ENOStatus === true) {
				client.commands.push({
					name: props.name,
					description: props.description,
					options: props.options,
				});
				console.log(`${lang.loadcmd}: ${props.name}`);
			} else if (props.ENOStatus === false) {
				console.log(`${lang.loadcmd_fal}: ${props.name}`);
			} else {
				console.log(`${lang.loadcmd_error_lost}: ${props.name}`);
			};
		}
	} catch (err) {
	  console.log(err);
	}
  });
});

if (config.TOKEN || process.env.TOKEN) {
  client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
	console.log(lang.error1);
  });
} else {
  setTimeout(() => {
	console.log(lang.error2);
  }, 2000);
}


if(config.mongodbURL || process.env.MONGO){
  const mongoose = require("mongoose")
  mongoose.connect(config.mongodbURL || process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async () => {
		console.log(`Connected MongoDB`)
  }).catch((err) => {
	console.log("\nMongoDB Error: " + err + "\n\n" + lang.error4)
	})
  } else {
  console.log(lang.error4)
  }


const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response?.sendStatus(200);
});
app.listen(process?.env?.PORT);
