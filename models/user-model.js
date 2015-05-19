var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
  name: { type:String, required: true },
  level: { type:String ,required: true }
});

var ExpSchema = new mongoose.Schema({
  startAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now },
  company: { type:String ,required: true },
  position: { type:String ,required: true }
});

var EduSchema = new mongoose.Schema({
  startAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now },
  institution: { type:String ,required: true },
  spec: { type:String ,required: true },
  degree: { type:String ,required: true }
});

var LangSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true}
});

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type:String, enum: ['male', 'female'] },
  marital: { type:String, enum: ['single', 'married'] },
  tel: { type: String },
  skype: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  objective: { type: String },
  skills: [SkillSchema],
  experience: [ExpSchema],
  education: [EduSchema],
  languages: [LangSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserModel', UserSchema);