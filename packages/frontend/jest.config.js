module.exports = {
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '\\.css$': ['jest-transform-css', { modules: true }],
    '^.+\\.(jpg|jpeg|png|gif|svg|ico|url)$':
      '<rootDir>/src/__tests__/__utils__/imageTransform.js',
  },
  testPathIgnorePatterns: ['/__utils__/'],
  testEnvironment: 'jsdom',
}
