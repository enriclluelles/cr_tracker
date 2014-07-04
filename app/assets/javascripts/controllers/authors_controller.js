//= require_tree ../models

(function(exports) {
  exports.AuthorsController = Marionette.Controller.extend({
    initialize: function(options) {
      this.layout = options.layout;
    },

    newAuthor: function() {
      var author = new exports.Models.Author();
      var newAuthorView = new exports.Views.NewAuthorView({model: author});
      this.layout.show(newAuthorView);
      this.trigger("navigate", "/authors/new");

      newAuthorView.on('save', function(model) {
        model.save({}, {success: function() {
          exports.authorsCollection.add(model);
          history.back();
        }});
      });

      newAuthorView.on('cancel', function() {
        history.back();
      });
    },

    listAuthors: function() {
      var self = this;
      var collectionView = exports.authorsCollectionView = new exports.Views.AuthorCollectionView({collection: exports.authorsCollection});
      collectionView.on('childview:edit', function(_, authorId) { self.editAuthor(authorId) });
      this.layout.show(collectionView);
      this.trigger("navigate", "/authors");
    },

    editAuthor: function(authorId) {
      var author = exports.authorsCollection.get(authorId);
      var author = (authorId && exports.authorsCollection.get(authorId)) || new exports.Models.Author({id: authorId});
      author.fetch();
      var authorComics = exports.comicsCollection.where({author_id: Number(authorId)});
      var editView = new exports.Views.EditAuthorView({model: author, comics: authorComics});
      editView.on('modified', function(model) {
        model.save({}, {silent: true});
      });

      this.layout.show(editView);
      this.trigger("navigate", "/authors/" + authorId);
    }
  });
})(window.ComicBookmarkTracker);
