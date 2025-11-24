[![npm version](https://img.shields.io/npm/v/woowa-mission-lint?style=flat&color=blue)](https://www.npmjs.com/package/woowa-mission-lint)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![MIT License](https://img.shields.io/badge/license-MIT-red.svg)

# woowa-mission-lint

`woowa-mission-lint`는 우아한 테크코스 프리코스 미션 진행을 돕는 ESlint/Prettier 통합 검증 라이브러리 입니다.

한글로 구성된 **단 하나**의 설정 파일(`woowalint.json`)로 요구사항 검증에 들이는 시간 감소를 목표로 하고 있습니다.
<br><br>

## 왜 필요할까요?

1️⃣ 주차를 거듭하면서 요구사항이 추가되고, 파일의 수가 많아지면서 놓친 요구사항이 있지는 않으셨나요?

2️⃣ 영어로 된 설정 파일을 수정해야 하는데, 어디서부터 건드려야 할 지 어려움을 겪지 않으셨나요?

3️⃣ ESLint와 Prettier를 각각 설치하고, 여러개의 설정파일을 만들고 수정하느라 고생하시진 않으셨나요?

**프리코스를 진행하며 요구사항을 검증할 때 겪으셨던 어려움을 제가 해결해 드릴게요** 😊
<br><br>

## 데모 영상
![Image](https://github.com/user-attachments/assets/5aa52cf3-d2ee-46de-8084-68b33c7ab9b0)

## 사용하기

1. 모듈 다운로드

```sh
npm i woowa-mission-lint
```

_프로젝트에서 ESLint와 Prettier를 사용중이라면 충돌 방지를 위해 미리 삭제하는 것을 권장합니다_
<br><br>

2. 초기 설정

`woowalint.json` 파일이 생성됩니다.

`package.json`에 `"prettier": "woowa-mission-lint"` 설정이 추가됩니다.

```sh
npx woowa-lint init
```

<br>

3. 바로 사용하기

기본 실행 레벨로 요구사항을 검증합니다.

```sh
npx woowa-lint
```

<br>

4. 레벨 옵션과 함께 사용하기

선택한 레벨의 규칙으로 요구사항을 검증합니다.

- 레벨 1

```sh
npx woowa-lint --level 1
```

- 레벨 2

```sh
npx woowa-lint --level 2
```

- 레벨 3

```sh
npx woowa-lint --level 3
```

3개의 기본 레벨은 [여기서](#-3-기본-레벨-레벨-13) 확인해주세요
<br><br>

#### ESLint & Prettier 내장 명령어

_(내장 명령어 없이 사용할 수 있도록 발전시키겠습니다)_ 😂

```sh
npx prettier --write .
```

현재 프로젝트에 프리티어를 일괄 적용합니다.

## 설정 파일 다루기

생성된 `woowalint.json` 파일은 아래와 같이 사전에 정의된 설정이 **한글**로 작성되어 있습니다.

```javascript
{
  "기본_실행_레벨": "level_1",
  "검사_제외_폴더": ["__tests__/**", "node_modules/**"],
  "레벨별_규칙": {
    "level_1": {
      /* ... level 1 규칙 ... */
    },
    "level_2": {
      /* ... level 2 규칙 ... */
    },
    "level_3": {
      /* ... level 3 규칙 ... */
    }
  },
  "프리티어_설정": {
    /* 기본 프리티어 설정 */
  }
}
```

### 기본 실행 레벨

`npx woowa-lint`로 검증을 실시할 때 적용되는 레벨을 설정합니다.

레벨의 이름이 정확히 일치해야 합니다.
<br>
<br>

### 검사 제외 폴더

검증을 실시하지 않을 폴더를 지정합니다.
와일드카드( \*\* , \* )와 관련된 정보는 [이곳](https://www.daleseo.com/glob-patterns/#-%EA%B8%B0%ED%98%B8)에서 확인 해주세요.

_기본값은 Jest의 테스트 폴더와 node_modules입니다_
<br>
<br>

### 레벨별 규칙

기존 레벨 1~3의 규칙을 수정할 수 있습니다.

필요에 따라 레벨을 추가하거나 삭제할 수 있습니다.

레벨명은 **문자열**이어야 하고, 사용 가능한 규칙만 사용해야 합니다.<br>
➡️ [**설정 가능한 전체 Lint 규칙 목록은 여기를 참고하세요.**](#-lint-설정)

#### 예시

```js
"level_레벨명": {/* ... 사용자 정의 규칙 ... */}
```

<br>

### 프리티어 설정

`"프리티어_설정"` 객체를 통해 이 스타일을 **한글로** 직접 수정할 수 있습니다.

[_VS Code를 사용하신다면, Prettier Extension으로 자동 포맷팅을 사용 해보세요_](https://velog.io/@jhje5595/Prettier-Extension%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9E%90%EB%8F%99-%ED%8F%AC%EB%A7%B7%ED%8C%85-%EC%84%A4%EC%A0%95-in-VS-Code)

```
**주의 사항**
자동 포맷팅을 사용하는 경우 프리티어 설정을 변경하고 난 후에는
코드 편집기(VS Code,Atom...)를 reload 하거나 재실행 해야합니다
```

➡️ [**설정 가능한 전체 Prettier 규칙 목록은 여기를 참고하세요.**](#-프리티어-설정-prettier)

<br><br>

## 기본 코드 스타일과 린트 규칙

별도의 설정 없이 바로 사용하실 수 있도록 기본 규칙들을 미리 정의해 놨습니다.<br>
설정되어 있는 규칙은 아래와 같습니다.
<br><br>

### 🎨 1. 기본 코드 스타일 (Prettier)

1. 작은 따옴표(')를 사용합니다
2. 한 줄의 최대 글자수는 80자입니다.
3. 들여쓰기는 space 2칸을 사용합니다.
4. 코드의 각 라인 끝에 세미콜론(;)을 삽입합니다.
5. if, for, while 문을 사용할 때 공백을 추가합니다.
6. 화살표 함수의 인자가 1개일때도 괄호 사용을 강제합니다.
7. 객체나 배열의 마지막 항목 이후에도 콤마(,)를 사용합니다.
8. 각 파일의 끝에서 단일 줄바꿈을 강제합니다. (파일의 마지막 줄은 코드가 아닌 공백)

<br>

### 📝 2. 기본 린트 규칙 (ESLint)

1. `constants` 폴더 내의 상수명은 **영어 대문자 + SNAKE_CASE**를 준수해야 합니다.
2. `if`, `for`, `while` 같은 제어문을 사용할 때 는 중괄호를 생략할 수 없습니다.
3. 변수명/함수명은 **camelCase**를 준수해야 합니다.
4. 메서드 사이에는 1줄의 공백이 필요합니다.
5. console 객체를 사용할 수 없습니다.

<br>

### 📊 3. 기본 레벨 (레벨 1~3)

#### Level 1

- 기본 린트 규칙만 적용됩니다.

#### Level 2

- Level 1의 모든 규칙이 적용됩니다.
- **삼항연산자를 사용하지 않았는지 확인합니다.**
- **indent depth(들여쓰기)가 2를 넘지 않는지 확인합니다.**

#### Level 3

- Level 2의 모든 규칙이 적용됩니다.
- **한 메서드가 15줄을 넘지 않는지 확인합니다.**

---

## 🔡 Lint 설정

_모든 규칙은 "off" 또는 false 옵션을 주어 비활성화 할 수 있습니다._

### 카멜\_케이스\_검사

- 옵션 타입: `Boolean`

- 사용 예시:

  ```json
  "카멜_케이스_검사": true
  ```

### if문\_중괄호\_필수

- 옵션 타입: `Boolean`

- 사용 예시:

  ```json
  "if문_중괄호_필수": true
  ```

### 메서드\_사이\_공백

- 옵션 타입: `Boolean`

- 사용 예시:

  ```json
  "메서드_사이_공백": true
  ```

### 최대\_들여쓰기\_깊이

- 옵션 타입: `Number`

- 사용 예시:

  ```json
  "최대_들여쓰기_깊이": 2
  ```

### 삼항연산자\_금지

- 옵션 타입: `Boolean`

- 사용 예시:

  ```json
  "삼항연산자_금지": true
  ```

### 함수\_최대\_라인수

- 옵션 타입: `Number`

- 사용 예시:

  ```json
  "함수_최대_라인수": 15
  ```

### 콘솔\_객체\_금지

- 옵션 타입: `Boolean`

- 사용 예시:

  ```json
  "콘솔_객체_금지": true
  ```

### 상수\_스네이크\_케이스\_검사

- 옵션 타입: `Object`

- 사용 예시:

  ```json
  "상수_스네이크_케이스_검사": {
    "적용_폴더": ["constants/**/*.js"]
  }
  ```

---

## 🎨 프리티어 설정 (Prettier)

### 홑따옴표\_사용 (singleQuote)

- 옵션 타입: `Boolean`
- 설명: `true`일 경우 홑따옴표(`'`)를, `false`일 경우 쌍따옴표(`"`)를 사용합니다.
- 사용 예시:
  ```json
  "홑따옴표_사용": true
  ```

### 세미콜론\_사용 (semi)

- 옵션 타입: `Boolean`
- 설명: `true`일 경우 라인 끝에 세미콜론(`;`)을 붙입니다.
- 사용 예시:
  ```json
  "세미콜론_사용": true
  ```

### 탭\_사용 (useTabs)

- 옵션 타입: `Boolean`
- 설명: `true`일 경우 들여쓰기에 탭을, `false`일 경우 스페이스를 사용합니다.
- 사용 예시:
  ```json
  "탭_사용": false
  ```

### 탭\_너비 (tabWidth)

- 옵션 타입: `Number`
- 설명: 들여쓰기 너비를 스페이스 몇 칸으로 할지 지정합니다.
- 사용 예시:
  ```json
  "탭_너비": 2
  ```

### 한\_줄당\_최대\_글자수 (printWidth)

- 옵션 타입: `Number`
- 설명: 한 줄의 최대 글자 수를 지정합니다. 이 길이를 넘어가면 줄바꿈됩니다.
- 사용 예시:
  ```json
  "한_줄당_최대_글자수": 80
  ```

### 화살표\_함수\_괄호 (arrowParens)

- 옵션 타입: `String`
- 설명:
  - `"always"`: 화살표 함수의 인자가 1개여도 항상 괄호(`( )`)를 사용합니다. (예: `(arg) => ...`)
  - `"avoid"`: 인자가 1개일 경우 괄호를 생략합니다. (예: `arg => ...`)
- 사용 예시:
  ```json
  "화살표_함수_괄호": "always"
  ```

### 후행\_콤마 (trailingComma)

- 옵션 타입: `String`
- 설명:
  - `"all"`: 객체, 배열, 함수 인자 등 가능한 모든 곳의 마지막 항목 뒤에 콤마를 붙입니다.
  - `"none"`: 후행 콤마를 사용하지 않습니다.
- 사용 예시:
  ```json
  "후행_콤마": "all"
  ```

## 🛠️ 의존성

- **린트 & 포맷팅**
  - `ESLint`
  - `Prettier`
  - `eslint-config-prettier`: ESLint와 Prettier의 충돌 규칙을 끔
  - `eslint-plugin-prettier`: Prettier 오류를 ESLint 오류로 보고
  - `@stylistic/eslint-plugin`: `메서드_사이_공백` 등 추가 규칙 제공

- **CLI (터미널)**
  - `Commander.js`: `npx woowa-lint --level 1`과 같은 명령어 처리
  - `inquirer`: `init` 시 "덮어쓰기" 같은 대화형 인터페이스 처리
  - `chalk`: 터미널 출력에 색상과 스타일 적용

## Contributors

[<img src="https://avatars.githubusercontent.com/u/35906526?v%3D4" width="50" alt="2SOOY">](https://github.com/jebiyeon02)
