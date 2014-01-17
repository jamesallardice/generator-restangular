# generator-restangular

A [Yeoman][yeoman] generator for AngularJS apps using [Restangular][rest].
Generates apps with the following features:

 - Basic Restangular configuration
 - Bower configuration
 - Angular routing
 - Unit tests (with Karma and Jasmine)
 - Integration tests (with Protractor)
 - Mocked backend for testing
 - Complete set of dotfiles

## Installation and use

The generator is published to [npm][npm] so you can install it like usual:

```
$ npm install -g generator-restangular
```

The generator depends on Yeoman, so if you don't already have it run:

```
$ npm install -g yo
```

You can now scaffold a new AngularJS application, complete with dependencies
and basic directory structure:

```
$ mkdir new-app && cd $_
$ yo restangular
```

You'll be asked a few questions while Yeoman sets up your app. In particular
this allows you to customise the version of various dependencies (such as
AngularJS, Restangular and jQuery). Any valid [semver][sv] string is a valid
value for these configuration questions (although of course it depends on there
being a published copy of the library under the specified version).

[yeoman]: http://yeoman.io
[rest]: https://github.com/mgonto/restangular
[npm]: https://npmjs.org/package/generator-restangular
[sv]: http://semver.org/
