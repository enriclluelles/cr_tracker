//= require_tree ../models

(function(exports) {
  exports.ComicsController = Marionette.Controller.extend({
    initialize: function(options) {
      this.layout = options.layout;
    },

    listComics: function() {
      var self = this;
      var collectionView = exports.comicsCollectionView = new exports.Views.ComicCollectionView({collection: exports.comicsCollection});
      collectionView.on('childview:edit', function(_, comicId) { self.editComic(comicId) });
      this.layout.show(collectionView);
      this.trigger("navigate", "/comics");
    },

    editComic: function(comicId) {
      var comic = exports.comicsCollection.get(comicId);
      var authorId = comic.get('author_id');
      var author = (authorId && exports.authorsCollection.get(authorId)) || new exports.Models.Author({id: authorId});
      comic.fetch();
      var editView = new exports.Views.EditComicView({model: comic, authors: exports.authorsCollection.models});
      editView.on('modified', function(model) {
        model.save({}, {silent: true});
      });

      editView.on('uploadImage', this.uploadImage);

      editView.on('addAuthor', function() {
        this.trigger('navigate', "/authors/new", true);
      }.bind(this));

      this.layout.show(editView);
      this.trigger("navigate", "/comics/" + comicId);
    },

    addAuthor: function() {
      this.authorsController = this.authorsController || new exports.AuthorsController();
    },

    uploadImage: function(model, file) {
      var data = new FormData();
      data.append('file', file);
      $.ajax({
        url: '/api/images',
        data: data,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(d) {
          model.set('image_url', d.url);
          model.save();
        }
      });
    },

    newComic: function() {
      var comic = new exports.Models.Comic();
      var editView = new exports.Views.EditComicView({model: comic, authors: exports.authorsCollection.models});
      editView.on('addAuthor', function() {
        this.trigger('navigate', "/authors/new", true);
      }.bind(this));

      editView.on('uploadImage', this.uploadImage);

      editView.on('modified', function(model) {
        model.save({}, {
          success: function() {
            exports.comicsCollection.add(model);
          }
        });
      });

      this.layout.show(editView);
      this.trigger("navigate", "/comics/new");
    }

  });
})(window.ComicBookmarkTracker);
