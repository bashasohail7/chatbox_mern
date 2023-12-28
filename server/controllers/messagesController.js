const messageModel = require("../models/messageModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.status(201).json({ message: "Message added succesfully!" });
    return res.status(400).json({ message: "something went wrong" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    console.log("req body",req.body);
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt:msg.createdAt
      };
    });
    res.status(200).json(projectMessages);
  } catch (error) {
    next(error);
  }
};
