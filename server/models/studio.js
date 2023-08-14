const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudioSchema = new Schema({
    studio_name: { type: String, required: true },
    staff_count: { type: Number, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
})

StudioSchema.virtual("url").get(function () {
    return `/catalog/studio/${this._id}`;
})

// Export the model
module.exports = mongoose.model("Studio", StudioSchema)