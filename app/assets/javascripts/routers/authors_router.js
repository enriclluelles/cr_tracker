(function(exports) {
  exports.AuthorsRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'authors/new': 'newAuthor',
      'authors': 'listAuthors',
      'authors/:authorId': 'editAuthor'
    }
  });
})(window.ComicBookmarkTracker)
