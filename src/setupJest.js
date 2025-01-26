require('jest-fetch-mock').enableMocks();

afterEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});