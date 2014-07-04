(function(exports) {
  exports.EditAuthorView = Backbone.Marionette.ItemView.extend({
    events: {
      "keydown input[type=text]": "_change"
    },

    tagName: 'div',

    template: '#edit-author',

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.on('change', this.render);
      this._change = _.debounce(this._setAndTrigger.bind(this), 1500);
    },

    _setAndTrigger: function() {
      var model = this.model;
      this.model.off('change', this.render);
      model.set('name', this.$('[name="author\[name\]"]').val())
      this.model.on('change', this.render);
      this.trigger('modified', this.model);
    },

    render: function() {
      var template = $(this.getTemplate()).html();
      var templateResult = _.template(template, {author: this.model.attributes, comics: this.options.comics});
      this.$el.html(_.template(templateResult));
    }

  });
})(window.ComicBookmarkTracker.Views);
