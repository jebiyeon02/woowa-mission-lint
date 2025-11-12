import chalk from 'chalk';
import path from 'path';

export function formatWoowaLint(results) {
  let output = '\n';
  let totalWarnings = 0;

  const errorCount = {};
  const projectRoot = process.cwd();

  const checkFileCount = results.length;
  output += '📝 검증 결과\n\n';

  let errorDetails = '';

  for (const result of results) {
    const messages = result.messages;
    if (messages.length === 0) continue;

    const filePath = path.relative(projectRoot, result.filePath);
    errorCount[filePath] = messages.length;

    errorDetails += '🗂️  \n';
    errorDetails += chalk.bold.blueBright(filePath) + '\n';

    for (const message of messages) {
      const line = String(message.line || 0).padStart(3, ' ');
      const col = String(message.column || 0).padEnd(2, ' ');

      const location = chalk.dim(`${line}:${col}`);

      const severity = chalk.red('오류');
      const msg = message.message;
      const rule = message.ruleId ? chalk.dim(`(${message.ruleId})`) : '';

      errorDetails += `${location}  ${severity}  ${msg}  ${rule}\n`;
    }

    errorDetails += '\n';
  }

  const totalErrors = Object.entries(errorCount).reduce(
    (acc, [_, value]) => acc + value,
    0,
  );

  output += chalk.red(`✖ 오류 ${totalErrors}개 `);
  output += chalk.yellow(`⚠️ 경고 ${totalWarnings}개 `);
  output += chalk.blue(`🗂  검증 파일 ${checkFileCount}개\n\n`);
  if (totalErrors > 0) {
    output += errorDetails;
    // 오류 가장 많은 파일 output 넣기
    let maxErrorOutput = chalk.bold.redBright('오류가 가장 많은 파일\n');
    const maxErrorCount = Math.max(...Object.values(errorCount));
    const maxErrorFiles = Object.entries(errorCount).filter(
      ([_, errorCount]) => errorCount === maxErrorCount,
    );
    maxErrorFiles.forEach((file) => {
      maxErrorOutput += `  • ${file[0].padEnd(30, ' ')}`;
      maxErrorOutput += chalk.gray(`✖ ${file[1]}개\n`);
    });

    output += maxErrorOutput + '\n';
  } else {
    output += chalk.bold.green('✅ 문제가 발견되지 않았습니다!');
  }

  return chalk.reset(output);
}
