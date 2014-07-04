(function(exports) {
  exports.ComicView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',

    className: 'comic-item',

    template: '#comic-item',

    events: {
      "click .edit-link": "edit"
    },

    initialize: function() {
      this.model.on('change', this.render);
      this.on('destroy', function() {
        this.model.off('change', this.render);
      }.bind(this));
    },

    edit: function(e) {
      e.preventDefault();
      this.trigger('edit', this.model.get('id'))
    }
  });
})(window.ComicBookmarkTracker.Views);
