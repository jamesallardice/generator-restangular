# <%= appName %>

Welcome to the repository for <%= appName %>.

## Developing

We use [Grunt][grunt] to build the production app. Make sure it's globally
installed:

```
$ npm install -g grunt-cli
```

From the root directory of the app you can now tell Grunt to watch the file
system for changes. It will rebuild when a change is detected:

```
$ grunt watch
```

Grunt will only rebuild the production-ready app when it's watching. It won't
run any tests. To run tests manually:

```
$ grunt test:unit    # Run unit tests only
$ grunt test:e2e     # Run integration tests only
$ grunt test         # Run all tests
```

[grunt]: http://gruntjs.com/
