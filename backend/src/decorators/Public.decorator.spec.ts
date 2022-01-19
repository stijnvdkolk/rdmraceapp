import { IS_PUBLIC_KEY, Public } from './Public.decorator';

describe('@Public', () => {
  class TestWithMethod {
    @Public()
    public static test() {
      return;
    }
  }

  it('should enhance the method with the public metadata', () => {
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, TestWithMethod.test),
    ).toBeTruthy();
  });
});
