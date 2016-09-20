const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  tags: [{ type: String, required: true}],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

TodoSchema.index({content: 1});

export default mongoose.model('Todo', TodoSchema);
