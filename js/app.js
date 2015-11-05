var app = app || {};

(function () {
    'use strict';

    var UMovieRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'watchlists': 'watchlists',
            'watchlist/:id/movies': 'watchlistMovies',
            'watchlist/:id/addMovies': 'watchlistAddMovies',
            'tvshows': 'tvshows',
            'tvshows/:id': 'tvshow',
            'actors': 'actors',
            'actors/:id': 'singleActor'
        }
    });

    function clearViews() {
        $(".tvshows").empty();
        $(".tvshow").empty();
        $(".actors").empty();
        $(".single-actor").empty();
        $(".watchlist").empty();
        $(".watchlist-movies").empty();
        $(".watchlist-add-movie").empty();
    }

    app.UMovieRouter = new UMovieRouter();

    app.UMovieRouter.on('route:home', function () {
        app.NavBarView.render();
    });
    app.UMovieRouter.on('route:tvshows', function () {
        clearViews();
        app.TvShowsView.get();
    });
    app.UMovieRouter.on('route:tvshow', function (tvShowID) {
        clearViews();
        app.TvShowView.get({tvShowID: tvShowID});
    });
    app.UMovieRouter.on('route:watchlists', function () {
        clearViews();
        app.WatchlistView.get();
    });
    app.UMovieRouter.on('route:actors', function () {
        clearViews();
        app.ActorsView.get();
    });
    app.UMovieRouter.on('route:singleActor', function (actorID) {
        clearViews();
        app.SingleActorView.get({actorID : actorID});
    });
    app.UMovieRouter.on('route:watchlistMovies', function (watchlistID) {
        clearViews();
        app.WatchlistMoviesView.get({watchlistID: watchlistID});
    });

    app.UMovieRouter.on('route:watchlistAddMovies', function (watchlistID) {
        clearViews();
        app.AddMovieView.render(watchlistID);
    });

    Backbone.history.start();
})();