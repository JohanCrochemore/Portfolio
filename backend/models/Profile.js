import mongoose from 'mongoose';

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
            relatedSkills: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
            level: { type: String, enum: ["low", "medium", "experienced", "expert"], default: "low" }
        }
    ],
    githubLink: { type: String },
    linkedinLink: { type: String },                      
}, { timestamps: true });                           // createdAt / updatedAt

export default mongoose.model('Profile', ProfileSchema);
