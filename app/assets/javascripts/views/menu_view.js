(function(exports) {
  exports.MenuView = Backbone.Marionette.LayoutView.extend({
    template: '#menu-template',

    events: {
      'click #list-comics': 'listComics',
      'click #new-comic': 'newComic',
      'click #list-authors': 'listAuthors'
    },

    listAuthors: function(e) {
      e.preventDefault();
      this.trigger('listAuthors');
    },

    newComic: function(e) {
      e.preventDefault();
      this.trigger('newComic');
    },

    listComics: function(e) {
      e.preventDefault();
      this.trigger('listComics');
    }
  });
})(window.ComicBookmarkTracker);
