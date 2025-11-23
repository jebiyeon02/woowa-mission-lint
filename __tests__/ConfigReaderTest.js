import fs from 'fs';
import ConfigReader from '../src/ConfigReader.js';
import { jest } from '@jest/globals';

describe('ConfigReader 클래스 테스트', () => {
  const testConfigContent = {
    기본_실행_레벨: 'level_1',
    검사_제외_폴더: ['__tests__/**', 'node_modules/**'],
  };

  let readFileSyncSpy;

  beforeEach(() => {
    readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(testConfigContent));
  });

  // 각 테스트가 끝난 후 모든 모킹을 복원함
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('설정 파일의 내용을 올바르게 읽고 값을 반환해야 한다', () => {
    // given
    const configReader = new ConfigReader();

    // when
    const level = configReader.getOptionContents('root', '기본_실행_레벨');
    const exceptFolders = configReader.getOptionContents(
      'root',
      '검사_제외_폴더',
    );

    // then
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(level).toBe('level_1');
    expect(exceptFolders).toEqual(['__tests__/**', 'node_modules/**']);
  });

  test('존재하지 않는 옵션을 읽으려고 할 때 에러를 발생시킨다', () => {
    // given
    const configReader = new ConfigReader();

    // when & then
    expect(() => {
      configReader.getOptionContents('root', '없는_옵션');
    }).toThrow();
  });
});
