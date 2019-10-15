const message = (sequalize, DataTypes) => {
  const Message = sequalize.define('message', {
    text: DataTypes.STRING,
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
