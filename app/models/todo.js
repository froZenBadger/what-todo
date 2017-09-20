var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
      type: String,
      default: ''
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    priority: {
      type: String, enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    completed: {
      type: Boolean,
      default: false
    },
    due_date: {
      type: String,
      default: ''
    }
});
