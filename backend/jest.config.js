// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { compilerOptions } = require('./tsconfig.json');

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   rootDir: './',
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
//   modulePaths: ['<rootDir>'],
// };

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', 'json'],
  slowTestThreshold: 30,
};
