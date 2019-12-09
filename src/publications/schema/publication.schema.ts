import { Schema } from 'mongoose';

const PublicationSchema = new Schema({
  username: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
});

PublicationSchema.index({ title: 1 }, { unique: true });

export default PublicationSchema;