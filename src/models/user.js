const user = (sequalize, DataTypes) => {
  const User = sequalize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await user.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  return User;
};

export default user;
