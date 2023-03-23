const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artificialMessagesSchema = new Schema(
  {
    conversation: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const ArtificialMessages = mongoose.model(
  "ArtificialMessages",
  artificialMessagesSchema
);
module.exports = ArtificialMessages;
