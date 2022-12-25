const { token, applicationId } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const badgecmd = require("./badgecmd");
var cmdName;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
cmdName = badgecmd.data.name;

client.once(Events.ClientReady, (c) => {
  print(`Bot is online as ${c.user.tag}`);
  print(`Use /${cmdName} as command`);
});

client.commands = new Collection();
client.commands.set(cmdName, badgecmd);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  await command.execute(interaction);
});

let commands = [];
commands.push(badgecmd.data.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    const data = await rest.put(Routes.applicationCommands(applicationId), {
      body: commands,
    });
  } catch (e) {
    throw e;
    return;
  }
})();

client.login(token);

function print(txt) {
  console.log(txt);
}
