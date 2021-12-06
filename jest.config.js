module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['./dist/'],
    detectOpenHandles:true,
    verbose: false
    // resetMocks: true
  };