import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ProfileSchema = new mongoose.Schema({
    lastName: { type: String },
    firstName: { type: String },
    birthDate: {type: Date},
    phoneNumber: {type: String},         
    email: { type: String },
    picture: {type: String},
    profileDescription: { type: String },
    cvLink: { type: String },                        // URL vers le CV
    skills: [
        {
            name: { type: String },
            level: { type: String, enum: ["low", "medium", "experienced", "expert"], default: "low" },
            imageUrl: { type: String } // URL ou chemin du fichier image
        }
    ],
    githubLink: { type: String },
    linkedinLink: { type: String },                      
}, { timestamps: true });                           // createdAt / updatedAt

export default mongoose.model('Profile', ProfileSchema);
