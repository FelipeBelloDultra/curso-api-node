const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../../config/auth');

exports.store = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'Usuário não existe.' });
  }

  if (!(await user.checkPassword(password))) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  const { id, name } = user;

  return res.json({
    user: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  });
};
