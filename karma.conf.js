const karmaDefaults = require('systematic').karma_defaults(__dirname)

// eventual overrides

module.exports = (karma) => karma.set(karmaDefaults)
