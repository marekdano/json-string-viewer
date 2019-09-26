[![Build Status](https://secure.travis-ci.org/marekdano/json-string-viewer.svg?branch=master)](http://travis-ci.org/marekdano/json-string-viewer) 
<!-- [![coverage](https://codecov.io/gh/marekdano/json-string-viewer/branch/master/graph/badge.svg)](https://codecov.io/gh/marekdano/json-string-viewer) -->

# json-string-viewer
*JSON viewer which parse JSON string and display it in the JSON editor.* 

## Description

Having a valid JSON in the string format can be hard to modify. This app has been build to validate, parse and format json string and displaying the result JSON into the JSON editor.

[https://json-string-viewer.netlify.com](https://json-string-viewer.netlify.com)

## Features

* Validate json string
* Convert json string to JSON tree structure and format it
* Convert json string in the valid JSON to the JSON tree structure
* Download modified json string as a json string
* Download extracted and modified json string from a valid JSON as a new valid JSON
* Upload a JSON file
* Download a file with name of the uploaded file

## Development

### Install dependencies
```
yarn
```

### Running the app locally

```
yarn start:dev
```
After running the project just open your browser and go to http://localhost:8001

### Testing

The project is tested by running unit/intergration (jest) and e2e (cypress) tests.

Run integration tests by
```
yarn test:watch
```

and e2e tests
```
yarn test:e2e:dev
```

For more information about the npm scripts, please check *package.json*.


## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/marekdano/json-string-viewer/issues) or to [submit Pull Requests](https://github.com/marekdano/json-string-viewer/pulls).

## License

Licensed under [MIT License](http://opensource.org/licenses/MIT).
