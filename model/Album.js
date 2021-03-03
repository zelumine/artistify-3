const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    title: String,
    releaseDate: Date,
    label: { type: Schema.Types.ObjectId, ref: "label" }, 
    // ref is the link to an other collection, here label
    artist: { type: Schema.Types.ObjectId, ref: "artist" }, 
    // ref is the link to an other collection, here artist
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/gdaconcept/image/upload/v1614550771/workshop-artistify/default-album-cover_sjastw.png",
    },
  },
  { timestamps: true }
);

const AlbumModel = mongoose.model("album", albumSchema);

module.exports = AlbumModel;