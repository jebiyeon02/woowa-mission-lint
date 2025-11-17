#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';
import woowalintTemplateJsonFile from './woowalint.template.json' with { type: 'json' };
import TranslatorUtils from '../utils/TranslatorUtils.js';
import Translate from './Translate.js';
import chalk from 'chalk';
import ConfigReader from './ConfigReader.js';

// 메타데이터 설정
const program = new Command();
program
  .name('woowa-lint')
  .version('0.0.7')
  .description('우테코 린터 실행 및 초기 설정');

// 명령어 정의
program
  .description(
    'woowalint.json 파일을 생성하고, package.json에 prettier설정을 추가합니다.',
  )
  .command('init')
  .action(async () => {
    // 파일명 정의
    const fileName = 'woowalint.json';

    // config가 이미 존재하는지 확인
    if (fs.existsSync(fileName)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: '설정 파일이 이미 존재합니다. 덮어쓰시겠습니까?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log('작업이 취소되었습니다.');
        process.exit(0);
      }
    }

    // 2~3번째 파라미터를 넣어서 들여쓰기 2칸 넣고 보기좋게 생성함
    const content = JSON.stringify(woowalintTemplateJsonFile, null, 2);

    fs.writeFileSync(fileName, content);
    console.log('설정 파일이 생성되었습니다.');

    // 사용자의 package.json에 "prettier": "woowa-mission-lint"설정 추가

    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(
        '[ERROR]: package.json파일이 존재하지 않습니다. 생성 후 다시 시도 해주세요',
      );
    }
    const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath));
    if (packageJsonContent['prettier']) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message:
            'package.json에 prettier 설정이 이미 존재합니다. 덮어쓰시겠습니까?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log('작업이 취소되었습니다.');
        process.exit(0);
      }
    }

    packageJsonContent['prettier'] = 'woowa-mission-lint';

    try {
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJsonContent, null, 2),
      );
      console.log('프리티어 실행 설정이 적용 되었습니다.');
    } catch (err) {
      console.error(
        '프리티어 실행 설정 적용에 실패했습니다. (package.json 파일 쓰기 오류)',
        err,
      );
    }
  });

program
  .description('지정한 레벨로 우테코 린터를 실행합니다.')
  .option('--level <level>', '실행할 규칙 레벨 (예 : 1,2,3)')
  .action(async (options) => {
    try {
      const { level } = options;
      let runLintLevel = level;
      const configReader = new ConfigReader();

      // woowa-lint만 실행했을 때 기본 실행 레벨로 실행
      if (level === undefined) {
        const defaultLevel = configReader.getOptionContents(
          'root',
          '기본_실행_레벨',
        );
        runLintLevel = TranslatorUtils.substringAfterChar(defaultLevel, '_');
      }

      const levelString = chalk.yellow(runLintLevel);
      let startMessage = chalk.bold.cyan(`\n🔍 Woowa Linter 검증 시작`);
      startMessage += chalk.dim(` (레벨 ${levelString})`);
      console.log(startMessage);

      const allKoreanRules = configReader.getOptionContents(
        'root',
        '레벨별_규칙',
      );
      const koreanRules = configReader.getOptionContents(
        allKoreanRules,
        TranslatorUtils.addLevelPrefix(runLintLevel),
      );
      const translate = new Translate();
      await translate.runLint(koreanRules);
    } catch (error) {
      console.log(chalk.yellow(error.message));
    }
  });

program.parse(process.argv);
