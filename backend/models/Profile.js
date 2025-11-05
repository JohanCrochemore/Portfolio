import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ProfileSchema = new mongoose.Schema({
    lastName: { type: String },
    firstName: { type: String },          
    email: { type: String },
    profileDescription: { type: String },
    cvLink: { type: String },                        // URL vers le CV
    skills: [
        {
            name : {type: String},
            level : {type: String, enum :['low','medium','experienced','expert'], default : 'low'}
        }
    ],                      
}, { timestamps: true });                           // createdAt / updatedAt

export default mongoose.model('Profile', ProfileSchema);
