const { Configuration, OpenAIApi } = require("openai");
const ArtificialMessages = require("../models/artificial-intelligence");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.GPT_KEY,
  })
);

const chat = async (io, req, res) => {
  try {
    //conectare la ws
    io.on("connection", async (socket) => {
      console.log("WS connection was successfully established :)!");
      let input = ""; // asta va fi mesajul pentru AI
      let conversation = []; // va contine toate mesajele
      socket.on("chatMessage", (message) => {
        // mesajul este ce primim din frontend
        console.log(message);
        input = message;
        io.emit("message", message);
        conversation.push({ role: "User", message });
      });
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });
      if (!response) {
        throw new Error("Something went wrong...");
      }
      const aiResponse = response.data.choices[0].message.content;
      conversation.push({ role: "Ai", aiResponse });
      socket.emit("ai response", {
        content: response.data.choices[0].message.content,
        role: "ai",
      });
      socket.on("disconnect", () => {
        io.emit("disconnect", "User disconnected");
      });
      // conversatie terminata, pot salva conversatia
      await ArtificialMessages.create({ conversation });
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = chat;
