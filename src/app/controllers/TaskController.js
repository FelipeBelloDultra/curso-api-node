const Yup = require('yup');
const Task = require('../models/Task');

exports.index = async (req, res) => {
  const tasks = await Task.findAll({
    where: { user_id: req.userId, check: false },
  });

  return res.json(tasks);
};

exports.store = async (req, res) => {
  const schema = Yup.object().shape({
    task: Yup.string()
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Falha ao cadastrar.' });
  }

  const { task } = req.body;

  const tasks = await Task.create({
    user_id: req.userId,
    task,
  });

  return res.json(tasks);
};

exports.update = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByPk(taskId);

  if (!task) {
    return res.status(400).json({ error: 'Essa tarefa não existe' });
  }

  await task.update(req.body);

  return res.json(task);
};

exports.delete = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByPk(taskId);

  if (!task) {
    return res.status(400).json({ error: 'Essa tarefa não existe' });
  }

  if (task.user_id !== req.userId) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  await task.destroy();

  return res.send();
};
