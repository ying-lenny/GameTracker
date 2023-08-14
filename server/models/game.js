const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: { type: String, required: true},
    studio: { type: Schema.Types.ObjectId, ref: "Studio", required: true },
    summary: { type: String, required: true },
    rating: { type: Number, required: false },
    release_date: { type: Date, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Coming Soon", "Early Access", "Released"],
        default: "Coming Soon",
    },
});

GameSchema.virtual("url").get(function () {
    return `/catalog/game/${this._id}`; 
})

GameSchema.virtual("release_date_formatted").get(function () {
    return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
  });
  
// Export the model
module.exports = mongoose.model("Game", GameSchema);