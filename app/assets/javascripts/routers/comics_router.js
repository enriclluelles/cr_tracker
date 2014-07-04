(function(exports) {
  exports.ComicsRouter = Backbone.Marionette.AppRouter.extend({
    controller: exports.comicsController,
    appRoutes: {
      'comics': 'listComics',
      'comics/new': 'newComic',
      'comics/:id': 'editComic',
      '': 'listComics'
    }
  });
})(window.ComicBookmarkTracker)
