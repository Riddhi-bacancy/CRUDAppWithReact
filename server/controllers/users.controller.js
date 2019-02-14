const db = require('../models/index');

const usersApp = db.users;

exports.create = async function(req, res) {
  let user;
  try {
    user = await usersApp.create(req.body);
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err,
    });
  }
  return res.status(201).json({
    status: true,
    message: 'All Problem definitaion created successfully.',
    data: user,
  });
};
exports.list = async function(req, res) {
  const con = {};
  //con.limit = req.query.limit || 10;
  //con.offset = req.query.skip || 0;
  // if (req.query.sort !== '' && req.query.sort){
  //   con.order = req.query.sort.split(',').map(col => col.split(':'));
  // } else {
  //   con.order = ['id'];
  // }
  if (req.params.id) {
    con.where = { id: req.params.id, deletedAt: { [db.Sequelize.Op.eq]: null } };
  } else {
    con.where = { deletedAt: { [db.Sequelize.Op.eq]: null } };
  }
  
  let user;
  try {
    user = await usersApp.findAll(con);
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Records not found',
      details: err,
    });
  }
  if (user.length > 0){
    return res.status(200).json({
      status: true,
      message: 'All Problem definitaion fetched successfully.',
      data: user,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'No record found.',
    data: user,
  });
};


exports.edit = async function(req, res) {
  let user;
  const userId = req.params.id;
  console.log(userId);
  try {
    user = await usersApp.update({
      firstname: req.body.firstname,
      age:req.body.age,
      lastname: req.body.lastname,
      phoneno:req.body.phoneno
    },
    {
      where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } },
      returning: true,
      plain: true,
     
    });
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Records not found',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'All Problem definitaion updated successfully.',
    data: user[1].dataValues,
  });
};

exports.delete = async function(req, res) {
  let user;
  const userId = req.params.id;
  try {
    user = await usersApp.update({
      deletedAt: Date.now(),
    },
    {
      where: { id: userId },
    });
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'All Problem definitaion updated successfully.',
    data: user,
  });
};

