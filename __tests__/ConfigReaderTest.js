import ConfigReader from '../src/ConfigReader.js';

describe('설정 읽기 클래스 테스트', () => {
  test.each([
    ['root', '기본_실행_레벨', 'level_1'],
    ['root', '검사_제외_폴더', ['__tests__/**', 'node_modules/**']],
  ])('기능 테스트', (parent, option, result) => {
    // when
    const configReader = new ConfigReader();

    // then
    expect(configReader.getOptionContents(parent, option)).toEqual(result);
  });

  test('예외 테스트', () => {
    // given
    const mockOption = '우테코';

    // when
    const configReader = new ConfigReader();

    // then
    expect(() => configReader.getOptionContents('root', mockOption)).toThrow(
      '[ERROR]',
    );
  });
});
