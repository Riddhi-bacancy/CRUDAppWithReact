const db = require('../models/index');

const gendersApp = db.Genders;
exports.list = async function(req, res) {
    let gender;
    try {
        gender = await gendersApp.findAll();
      } catch (err){
        return res.status(500).json({
          status: false,
          message: 'Records not found',
          details: err
        });
      }
      if (gender.length > 0){
        return res.status(200).json({
          status: true,
          message: 'All Problem definitaion fetched successfully.',
          data: gender
        });
      }
      return res.status(200).json({
        status: true,
        message: 'No record found.',
        data: gender
      });
}