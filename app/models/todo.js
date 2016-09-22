import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  tags: [{ type: String, required: true}],
  user: { type: String, required: true }
});

TodoSchema.index({content: 1});

export default mongoose.model('Todo', TodoSchema);
