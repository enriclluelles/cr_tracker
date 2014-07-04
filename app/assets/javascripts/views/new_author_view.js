(function(exports) {
  exports.NewAuthorView = Backbone.Marionette.ItemView.extend({
    events: {
      "click .button.done": "done",
      "click .button.cancel": "cancel"
    },

    tagName: 'div',

    template: '#new-author',

    initialize: function() {
      _.bindAll(this, 'render');
    },

    done: function() {
      this.model.set('name', this.$('[name="author\[name\]"]').val())
      this.trigger('save', this.model);
    },

    cancel: function() {
      this.trigger('cancel');
    }
  });
})(window.ComicBookmarkTracker.Views);
