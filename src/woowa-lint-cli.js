#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
import woowalintTemplateJsonFile from "./woowalint.template.json" with {type:"json"};

// 메타데이터 설정
const program = new Command();
program
  .name("woowa-lint")
  .version("0.0.1")
  .description("우테코 린터 초기 설정");

// 명령어 정의
program
  .command("init")
  .description("woowalint.json 파일을 생성합니다.")
  .action(async () => {
    // 파일명 정의
    const fileName = "woowalint.json";

    // config가 이미 존재하는지 확인
    if (fs.existsSync(fileName)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "설정 파일이 이미 존재합니다. 덮어쓰시겠습니까?",
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log("작업이 취소되었습니다.");
        process.exit(0);
      }
    }

    // 2~3번째 파라미터를 넣어서 들여쓰기 2칸 넣고 보기좋게 생성함
    const content = JSON.stringify(woowalintTemplateJsonFile,null,2);

    fs.writeFileSync(fileName, content);
    console.log("설정 파일이 생성되었습니다.");
  });
  
program.parse(process.argv);
