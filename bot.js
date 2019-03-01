// require statements

// here, we get a Client 'class' from the discord.js API, which lets us use the bot on discord
const { Client } = require("discord.js");

// settings

// keep this a secret! this is like the password you use so discord will let you use the bot
const token = "this is where your token goes (I'm not revealing mine!)";

// this is out vocab list, however I changed it to an array of objects for better structure (complicated stuff)
const vocabList = [
  { word: "cat", definition: "a small furry animal" },
  { word: "rock", definition: "the solid mineral material" },
  { word: "car", definition: "a road vehicle" }
];

// variable declarations

// here, we create a new client, which we use to send & recieve messages and such
const client = new Client();
// these two variables will come in use later for storing information about the vocab
let channel = null;
let answer = null;

// client events

// when the bot connects and will start working, it runs the code in here
client.on("ready", () => {
  // this prints "bot connected" to the console you're using to run the bot
  console.log("bot connected");
});

// when the bot sees a message is sent in any channel it can see, it runs the code in here
client.on("message", message => {
  // first, make sure it's not seeing it's own messages
  if (message.author.id === client.user.id) return;

  const input = message.content;
  // this checks to see if the message's channel matches the channel you're looking for answers in
  if (message.channel.id == channel) {
    // this checks to see if your answer correct, ignoring capitalization
    if (input.toLowerCase() === answer) {
      // say "Correct!"
      message.channel.send("Correct!");
      // set these two variables back to nothing so it won't look for an answer
      answer = null;
      channel = null;
    } else {
      message.channel.send("Incorrect. Try again.");
    }
  } else {
    // this checks to see if you said "ask question"
    if (input === "ask question") {
      // this line picks a random vocab from the list (it's complicated, so you don't need to understand it for now)
      const vocab = vocabList[Math.floor(Math.random() * vocabList.length)];
      // ask the question
      message.channel.send(`What is the definition of ${vocab.word}?`);
      // this sets the answer it's going to look for and what channel to look in, like you saw above
      answer = vocab.definition;
      channel = message.channel.id;
    }
  }
});

// connect to discord

client.login(token);
