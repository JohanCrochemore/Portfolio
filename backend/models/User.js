import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String },          
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true },
  role: { type: String, enum: ['admin', 'demo'], default: 'demo' },
  profileDescription: { type: String },
  cvLink: { type: String },                        // URL vers le CV
  skills: [{ type: String }],                      // Liste de compétences
}, { timestamps: true });                           // createdAt / updatedAt

// Middleware pour hasher le mot de passe avant save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer le mot de passe à l’authentification
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
