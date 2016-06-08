# Tic Tac Toe with React

<!--> [Yeoman](http://yeoman.io) generator for facebook's React library - Integrate with gulp and browserify.-->
> Implementation of Tic Tac Toe game in facebook's React library (no AI included) using Randy Lien's [Yeoman](http://yeoman.io) [generator](https://github.com/randylien/generator-react-gulp-browserify)

<!--https://github.com/randylien/generator-react-gulp-browserify-->

## What's inside?

* Gulp
* Bower
* jQuery
* Browserify
* Reactify - Help to transform JSX
* Watchify
* livereload (BrowserSync)
* Sass with Compass
* Bootstrap - Twitter Bootstrap's official Sass version
* Modernizr
* Jest for unit tests

## Environment requirements

* node.js 4.2.2
* Sass >= 3.4 if you want to use Sass


## How to install

```
$ npm install -g yo                                # Install Yeoman (if you don't have it yet)...
$ npm install -g generator-react-gulp-browserify   # ...then install this generator...
$ yo react-gulp-browserify                         # ...and run it.
```

If you chose to use sass, you'll need to install it with `gem install sass`.
If you find your css build results are empty, update your sass gem.

## Output folders 

scripts - /scripts  
styles - /styles  
fonts - /fonts  


Now, when everything is ready, run the watch task and begin to develop your React components.

```
$ gulp watch
```

How to run test?  
Currently, I prefer to run test tasks from npm. Please run this command.
```
$ npm test
```

After development, you can run this task to generate production code.
```
$ gulp build
```

## License

MIT
