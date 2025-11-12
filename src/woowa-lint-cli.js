#!/usr/bin/env node

import fs from 'fs';
import { Command } from 'commander';
import inquirer from 'inquirer';
import woowalintTemplateJsonFile from './woowalint.template.json' with { type: 'json' };
import TranslatorUtils from '../utils/TranslatorUtils.js';
import Translate from './Translate.js';
import chalk from 'chalk';

// 메타데이터 설정
const program = new Command();
program
  .name('woowa-lint')
  .version('0.0.2')
  .description('우테코 린터 실행 및 초기 설정');

// 명령어 정의
program
  .description('woowalint.json 파일을 생성합니다.')
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
  });

program
  .description('기본 실행 레벨로 우테코 린터를 실행합니다.')
  .action(async () => {
    const defaultLevel = TranslatorUtils.getDefaultLevelFromConfig();
    const koreanRules = TranslatorUtils.readKoreanRulesFromConfig(defaultLevel);
    const translate = new Translate();
    translate.runLint(koreanRules);
  });

program
  .description('지정한 레벨로 우테코 린터를 실행합니다.')
  .option('--level <level>', '실행할 규칙 레벨 (예 : 1,2,3)')
  .action(async (options) => {
    const { level } = options;
    let runLintLevel = level;

    // woowa-lint만 실행했을 때 기본 실행 레벨로 실행
    if (level === undefined) {
      const defaultLevel = TranslatorUtils.getDefaultLevelFromConfig();
      runLintLevel = defaultLevel;
    }

    let startMessage = chalk.bold.cyan('\n🔍 Woowa Linter 검증 시작 - ');
    startMessage += `(레벨 ${runLintLevel})`;
    console.log(startMessage);
    const koreanRules = TranslatorUtils.readKoreanRulesFromConfig(runLintLevel);
    const translate = new Translate();
    translate.runLint(koreanRules);
  });

program.parse(process.argv);
