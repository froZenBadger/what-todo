var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
      type: String,
      default: ''
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: false
    }
});
