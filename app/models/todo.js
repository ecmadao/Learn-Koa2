import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  content: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  important: { type: Boolean, required: true, default: false },
  tags: [{ type: String, required: true}],
  steps: [{ type: String, required: true}],
  user: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

TodoSchema.index({content: 1});
export default mongoose.model('Todo', TodoSchema);
