import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    fileTree:{
        type:Object,
        default:{}
    }
})

projectSchema.index({ name: 1}, { unique: true });

const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default ProjectModel;