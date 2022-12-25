//const { token, applicationId } = require("./config.json");
const fs = require("node:fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const badgecmd = require("./badgecmd");
const { rmSync } = require("node:fs");
var cmdName;
var token;
var applicationId;

print("Enter your bot token");
rl.question("> ", function (o) {
  let rp = o.replace(/ /g, "");
  if (rp === "") {
    console.log("No token entered");
    process.exit();
  }
  token = o;

  print("Enter your Application id");
  rl.question("> ", function (o1) {
    let r1 = o1.replace(/ /g, "");
    if (r1 === "") {
      console.log("No token entered");
      process.exit();
    }

    applicationId = o1;
    runBot();
    rl.close();
  });
});

function runBot() {
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
}

function print(txt) {
  console.log(txt);
}
