import { run } from '../src/action';

jest.mock('../src/action', () => ({
  run: jest.fn(),
}));

describe('main', () => {
  it('should call run', () => {
    require('../src/main');
    expect(run).toHaveBeenCalled();
  });
});
