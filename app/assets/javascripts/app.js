//= require_self
//= require_tree ./models
//= require_tree ./views
//= require_tree ./controllers
//= require_tree ./routers
//= require init
//
(function(exports) {
  var CBT = exports.ComicBookmarkTracker = new Backbone.Marionette.Application();

  var navigate = function(route, trigger) {
    Backbone.history.navigate(route, {trigger: !!trigger});
  };

  CBT.Models = {};
  CBT.Views = {};
  CBT.addInitializer(function() {
    this.layoutView = new this.AppLayoutView({el: "#main"});
    this.menuView = new this.MenuView()
  }.bind(CBT));

  CBT.addInitializer(function() {
    var c = this.comicsController = new this.ComicsController({layout: this.layoutView.content});
    this.comicsController.on("navigate", navigate);
    this.menuView.on('listComics', c.listComics.bind(c));
    this.menuView.on('newComic', c.newComic.bind(c));
    this.layoutView.render();
    this.layoutView.menu.show(this.menuView);
  }.bind(CBT));

  CBT.addInitializer(function() {
    var c = this.authorsController = new this.AuthorsController({layout: this.layoutView.content});
    this.menuView.on('listAuthors', c.listAuthors.bind(c));
    this.authorsController.on("navigate", navigate);
  }.bind(CBT));

  CBT.addInitializer(function() {
    this.comicsRouter = new this.ComicsRouter({controller: this.comicsController});
    this.authorsRouter = new this.AuthorsRouter({controller: this.authorsController});
  }.bind(CBT));

  //Initializer to make sure we're fetching all the data at the start
  CBT.addInitializer(function() {
    var counter = 0;

    var cb = function() {
      Backbone.history && Backbone.history.start({pushState: true});
    };

    //Gets passed as each success callback so it calls the true callback when them all are done
    var aux = function() {
      counter++;
      return function() {
        counter--;
        if (counter === 0) {
          cb();
        }
      };
    };

    this.comicsCollection = new this.Models.ComicCollection();
    this.comicsCollection.fetch({success: aux()});
    this.authorsCollection = new this.Models.AuthorCollection();
    this.authorsCollection.fetch({success: aux()});
  }.bind(CBT));
})(window);
