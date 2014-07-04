(function(exports) {
  exports.EditComicView = Backbone.Marionette.ItemView.extend({
    events: {
      "keydown input[type=text]": "_change",
      "keydown textarea": "_change",
      "change select": "_change",
      "click .add-author": "addAuthor",
      "change #comic-cover": "fileChanged"
    },

    tagName: 'div',

    template: '#edit-comic',

    initialize: function() {
      _.bindAll(this, 'render', 'addAuthor');
      this.model.on('change', this.render);
      this._change = _.debounce(this._setAndTrigger.bind(this), 1500);
    },

    _setAndTrigger: function() {
      var model = this.model;
      this.model.off('change', this.render);
      model.set('title', this.$('[name="comic\[title\]"]').val())
      model.set('synopsis', this.$('[name="comic\[synopsis\]"]').val())
      model.set('author_id', this.$('[name="comic\[author_id\]"] option:selected').val())
      this.model.on('change', this.render);
      this.trigger('modified', this.model);
    },

    addAuthor: function(e) {
      this.trigger('addAuthor');
      e.preventDefault();
    },

    fileChanged: function(e) {
      var file = e.originalEvent.target.files[0];
      this.trigger('uploadImage', this.model, file);
    },

    render: function() {
      var template = $(this.getTemplate()).html();
      var templateResult = _.template(template, {comic: this.model.attributes, authors: this.options.authors});
      this.$el.html(_.template(templateResult));
    }

  });
})(window.ComicBookmarkTracker.Views);
