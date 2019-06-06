const Joi = require('joi');


const schema = Joi.object().keys({
    firstname:Joi.string().regex(/^[a-zA-Z]{3,30}$/),
    lastname:Joi.string().regex(/^[a-zA-Z]{3,30}$/),
    age:Joi.number().required(),
    phoneno:Joi.string().regex(/^[0-9]{10}$/),
    gender:Joi.string()

});

function validationbody(req,res,next){

   Joi.validate(req.body,schema).then(() => { next(); }).catch(error => {console.log(error)});

    
}



module.exports = { validationbody };



