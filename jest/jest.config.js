const path = require('path');
module.exports = {
	rootDir: path.resolve(__dirname, '../'),
	roots: ['<rootDir>/src/js'],
	coverageDirectory: '<rootDir>coverage/jest-coverage',
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!**/node_modules/**'
	],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'.js': '<rootDir>/node_modules/jest-css-modules'
	},
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy'
	},
	testURL: 'http://localhost/'
};
