# ut61e

Stream interface for the UNI-T UT61E multimeter.
Requires the `he2325u` and `es51922` command line applications.
You can find a fork that fixes a Linux USB reset problem [here](https://github.com/bergos/ut61e_cpp).

## Usage

The module returns the UT61E class.
A measurement stream can be created by creating a new instance of the class.
The path to the `he2325u` and `es51922` must be provided in the options.

    var UT61E = require('ut61e')

    // creates a new instance
	var ut64e = new UT61E({
	  he2335u: {
	    // path to the command line application
	    path: '/home/bergi/Projects/c/ut61e_cpp/he2325u/he2325u'
	  },
	  es51922: {
	    // path to the command line application
	    path: '/home/bergi/Projects/c/ut61e_cpp/es51922/es51922'
	  }
	})

	ut64e.on('data', function (chunk) {
	  // writes the measurement objects to the console
      console.log(chunk)
    })
    
## Measurement object

The measurement object contains the following properties:

- `timestamp`: The number of milliseconds since 1 January 1970 00:00:00 UTC 
- `sequence`: A sequence number that starts at 1 after connecting to the device or parameter changes on the device
- `value`: The measured value
- `unit`: The unit of the measured value
