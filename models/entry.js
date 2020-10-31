
import mongoose from 'mongoose'

const EntrySchema = mongoose.Schema(
    {
      title: String,
      text: String,
      video: String,
      image: String,
    },
    { collection: "entries" }
  );

  export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema)
