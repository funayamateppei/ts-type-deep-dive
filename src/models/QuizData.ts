import type {Choice} from "./Choice"

export type QuizData = {
  title: string
  description: string
  code: string
  choices: Choice[]
  correctAnswer: string
  explanation: string
}

export const quizzes: Record<number, QuizData> = {
  1: {
    title: "クイズ1: プリミティブ型ラッパーオブジェクトの罠",
    description:
      "JavaScriptのプリミティブ型が持つオブジェクトラッパーの挙動と、TypeScriptの型推論が絡む問題です。以下のTypeScriptコードの出力は何になるでしょう？",
    code: `function getLength(arg: string | String): number {
  if (typeof arg === 'string') {
    return arg.length;
  }
  return arg.length;
}

const str1 = "Hello";
const str2 = new String("World");

console.log(getLength(str1));
console.log(getLength(str2));`,
    choices: [
      {id: "A", text: "5 と 5"},
      {id: "B", text: "5 と TypeError"},
      {id: "C", text: "5 と undefined"},
      {id: "D", text: "TypeError と 5"},
    ],
    correctAnswer: "A",
    explanation: `この問題のポイントは、JavaScriptのプリミティブ型である string と、オブジェクトとしての String 型の違い、そしてTypeScriptの型ガードの挙動です。

1. typeof arg === 'string' の挙動:
JavaScriptにおいて、typeof 演算子はプリミティブ型とオブジェクト型を区別します。
"Hello" の typeof は 'string' です。
new String("World") の typeof は 'object' です。

2. TypeScriptの型ガード:
if (typeof arg === 'string') のブロック内では、TypeScriptの型推論によって arg の型が string に絞り込まれます。このため、arg.length は問題なく呼び出せます。

3. String オブジェクトの length プロパティ:
new String("World") は String オブジェクトを生成します。JavaScriptの String オブジェクトは、そのインスタンスが保持する文字列の長さを返す length プロパティを持っています。したがって、str2.length も 5 を返します。

4. else ブロックの型:
else ブロックでは、arg の型は String に絞り込まれます。String オブジェクトには length プロパティが存在するため、arg.length はエラーなくアクセスできます。

TypeScriptは型の厳密さを提供しますが、JavaScriptのランタイムの挙動を完全に変えるわけではありません。この例は、JavaScriptのプリミティブ型ラッパーオブジェクトの特性と、TypeScriptの型ガードがどのように連携するかを示す好例です。`,
  },

  2: {
    title: "クイズ2: keyof any とインデックスシグネチャ",
    description:
      "keyof any が返す型と、インデックスシグネチャを持つ型が絡む問題です。以下のTypeScriptコードの出力は何になるでしょう？",
    code: `type Dictionary = {
  [key: string]: unknown;
};

type KeysOfDictionary = keyof Dictionary;
type KeysOfAny = keyof any;

function processKeys<T extends string | number | symbol>(keys: T[]): void {
  console.log(\`Processed keys: \${keys.join(', ')}\`);
}

processKeys<KeysOfDictionary>([ "name", "age", "city" ]);
processKeys<KeysOfAny>(["length", "toString", "constructor", "name", "0", Symbol("foo")]);
`,
    choices: [
      {id: "A", text: "Processed keys: name, age, city と Processed keys: length, toString, constructor, name, 0, Symbol(foo)"},
      {id: "B", text: "Processed keys: name, age, city と Processed keys: length, toString, constructor, name, 0"},
      {id: "C", text: "Processed keys: name, age, city と TypeError"},
      {id: "D", text: "TypeError と Processed keys: length, toString, constructor, name, 0"},
    ],
    correctAnswer: "B",
    explanation: `この問題は、keyof 演算子と、特に keyof any が返す型について理解しているかを問うものです。

1. keyof Dictionary の挙動:
Dictionary 型は文字列インデックスシグネチャ [key: string]: unknown を持っています。この場合、keyof Dictionary は文字列リテラル型 'string' ではなく、string 型そのものを返します。これは、Dictionary があらゆる文字列キーを持つ可能性があるためです。したがって、processKeys<KeysOfDictionary>(["name", "age", "city"]) は string[] 型の引数として正しく推論され、"name", "age", "city" が出力されます。

2. keyof any の挙動:
TypeScriptの型システムにおける any 型は、あらゆる型と互換性を持つ特殊な型です。keyof any は、JavaScriptのオブジェクトが通常持つプロパティキー（文字列、数値、シンボル）の union 型を返します。具体的には、string | number | symbol となります。
'length', 'toString', 'constructor' はオブジェクトが持つ一般的なメソッドやプロパティのキーです。
'name' は文字列キーです。
'0' は、配列のインデックスのような数値キーを文字列として表現したものです。TypeScriptでは、数値リテラル型は文字列リテラル型の部分型とみなされることがあります。
Symbol("foo") はシンボルキーです。

3. processKeys<KeysOfAny>(...) の呼び出し:
KeysOfAny は string | number | symbol です。processKeys 関数のジェネリクス制約 T extends string | number | symbol を満たすため、この呼び出しは型エラーになりません。
しかし、Symbol("foo") は processKeys の keys: T[] には渡せません。console.log(keys.join(', ')) は、配列の要素が文字列に変換されることを前提としています。Symbol は join メソッドで文字列に変換される際に、デフォルトでは 'Symbol(foo)' のような表現になります。
Array.prototype.join() は、配列の要素が null または undefined の場合は空文字列に、それ以外の場合は文字列に変換します。Symbol の場合は Symbol(description) の形式の文字列に変換されるため、これはエラーにならず正しく出力されます。
したがって、processKeys<KeysOfAny>(["length", "toString", "constructor", "name", "0", Symbol("foo")]); は以下の出力になります。
**Processed keys: length, toString, constructor, name, 0, Symbol(foo)**

重要なポイント: keyof any が string | number | symbol となること、そしてJavaScriptのランタイムでのシンボルの扱いを理解することが重要です。`,
  },

  3: {
    title: "クイズ3: ユニオン型の判別と in 演算子",
    description:
      "ユニオン型のオブジェクト判別において、in 演算子をどのように使うか、そしてTypeScriptの型ガードがどこまで働くかに関する問題です。以下のTypeScriptコードの出力は何になるでしょう？",
    code: `type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

type Shape = Circle | Square | Triangle;

function describeShape(shape: Shape): string {
  if ("radius" in shape) {
    return \`円（半径: \${shape.radius}）\`;
  } else if ("sideLength" in shape) {
    return \`四角形（一辺: \${shape.sideLength}）\`;
  } else if ("base" in shape && "height" in shape) {
    return \`三角形（底辺: \${shape.base}, 高さ: \${shape.height}）\`;
  }
  return "不明な図形"; // ここには到達しないはず
}

const myCircle: Circle = { kind: "circle", radius: 10 };
const mySquare: Square = { kind: "square", sideLength: 5 };
const myTriangle: Triangle = { kind: "triangle", base: 4, height: 6 };

console.log(describeShape(myCircle));
console.log(describeShape(mySquare));
console.log(describeShape(myTriangle));`,
    choices: [
      {id: "A", text: "円（半径: 10）、四角形（一辺: 5）、三角形（底辺: 4, 高さ: 6）"},
      {id: "B", text: "円（半径: 10）、四角形（一辺: 5）、不明な図形"},
      {id: "C", text: "円（半径: 10）、不明な図形、不明な図形"},
      {id: "D", text: "TypeError、TypeError、TypeError"},
    ],
    correctAnswer: "A",
    explanation: `この問題は、TypeScriptのユニオン型におけるプロパティの存在チェック (in 演算子) を使った型ガードの有効性を示しています。

1. in 演算子による型ガード:
TypeScriptは in 演算子を非常に強力な型ガードとして認識します。
if ("radius" in shape): この条件が true の場合、TypeScriptは shape が Circle 型であると推論します。なぜなら、Shape ユニオンの中で radius プロパティを持つのは Circle 型だけだからです。
else if ("sideLength" in shape): 同様に、このブロックでは shape が Square 型であると推論されます。
else if ("base" in shape && "height" in shape): このブロックでは、base と height の両方のプロパティを持つのは Triangle 型だけなので、shape は Triangle 型であると推論されます。

2. kind プロパティの役割:
この例では kind プロパティ（判別可能ユニオンのタグ）も存在しますが、in 演算子による型ガードは、kind プロパティがなくても機能します。TypeScriptのコンパイラは、ユニオン型内の個々の型が持つプロパティのユニークさを利用して型を絞り込むことができます。

3. 網羅性チェック:
もし Shape に別の型（例: Rectangle）が追加され、describeShape 関数が更新されない場合、TypeScriptは return "不明な図形"; の行に対して「到達しないコードパス」としてエラーを出すことはありません。しかし、もし最後の else if がなかったり、すべてのケースを網羅できていない場合は、shape の型が絞り込めずエラーになる可能性があります。
このコードでは、すべての Shape のメンバーが in 演算子で判別されているため、"不明な図形" には到達しません。

この例は、判別可能ユニオンにおいてタグプロパティ（kind）だけでなく、特定のプロパティの存在自体を型ガードとして利用できることを示しています。これは、既存のJavaScriptコードをTypeScriptに移行する際など、タグプロパティを容易に追加できない場合に特に役立つテクニックです。`,
  },

  4: {
    title: "クイズ4: 非同期処理のエラーハンドリングと型ガード",
    description:
      "async/await を用いた非同期処理において、エラーオブジェクトの型をどのように安全に扱うかに関する実用的な問題です。以下のTypeScriptコードの出力は何になるでしょう？Promise.reject() で投げられるエラーは、JavaScriptのランタイムが自動的に Error オブジェクトでラップすることはありません。",
    code: `async function fetchData(): Promise<string> {
  const shouldFail = true; // または false に変えて試す
  if (shouldFail) {
    // 意図的に文字列をrejectする
    return Promise.reject("データの取得に失敗しました");
  }
  return Promise.resolve("データが正常に取得されました");
}

async function processData(): Promise<void> {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (e: unknown) {
    if (typeof e === 'string') {
      console.log(\`エラーメッセージ: \${e}\`);
    } else if (e instanceof Error) {
      console.log(\`エラーオブジェクト: \${e.message}\`);
    } else {
      console.log(\`不明なエラー: \${JSON.stringify(e)}\`);
    }
  }
}

processData();`,
    choices: [
      {id: "A", text: "データが正常に取得されました (実行されない)"},
      {id: "B", text: "エラーメッセージ: データの取得に失敗しました"},
      {id: "C", text: "エラーオブジェクト: データの取得に失敗しました"},
      {id: "D", text: '不明なエラー: "データの取得に失敗しました"'},
    ],
    correctAnswer: "B",
    explanation: `この問題は、Promiseのエラーハンドリングにおける \`catch\` ブロックの引数 \`e\` の型 (\`unknown\`) と、その安全な絞り込みに関する実用的な知識を問うものです。

1. **\`catch (e: unknown)\` の重要性:**
   TypeScript 4.4 以降、\`catch\` ブロックの引数 \`e\` はデフォルトで \`unknown\` 型になります。これは、\`try\` ブロック内で発生するエラーがどのような型になるか（\`Error\` オブジェクト、文字列、数値、あるいはそれ以外）をコンパイラが予測できないため、安全側に倒した設計です。
   \`unknown\` 型の変数は、そのままではプロパティにアクセスできません。アクセスするためには型ガードで型を絞り込む必要があります。

2. **\`Promise.reject()\` の挙動:**
   \`Promise.reject()\` は、引数に渡された値をそのままエラーとして伝播させます。JavaScriptのランタイムは、\`try...catch\` で捕捉される前に \`Error\` オブジェクトでラップするようなことはしません。今回の例では、\`"データの取得に失敗しました"\` という**文字列**が直接エラーとして投げられます。

3. **型ガードの適用:**
   - \`if (typeof e === 'string')\`: この条件は、\`e\` が文字列型であることを確認します。\`Promise.reject("データの取得に失敗しました")\` によって投げられたエラーは文字列なので、このブロックに入ります。
   - \`else if (e instanceof Error)\`: これは \`e\` が \`Error\` クラスのインスタンスであるかどうかをチェックします。今回のケースでは文字列が投げられているため、このブロックには入りません。
   - \`else\`: 上記のどの条件にも合致しない場合に実行されます。

したがって、\`fetchData\` 関数が \`Promise.reject("データの取得に失敗しました")\` を実行すると、\`processData\` 関数の \`catch\` ブロックに文字列が渡され、最初の \`if (typeof e === 'string')\` が \`true\` になり、\`エラーメッセージ: データの取得に失敗しました\` が出力されます。

実用的なポイントとして、非同期処理のエラーハンドリングでは、\`catch (e: unknown)\` を活用し、\`typeof\` や \`instanceof\`、またはカスタム型ガードを使ってエラーの型を適切に判別することが非常に重要です。これにより、意図しないプロパティアクセスによるランタイムエラーを防ぎ、堅牢なエラー処理を実装できます。`,
  },

  5: {
    title: "クイズ5: Mapped Types と Optional Properties",
    description:
      "既存の型から新しい型を派生させる Mapped Types を使用した際に、オプショナルプロパティがどのように扱われるかに関する問題です。以下のTypeScriptコードの出力は何になるでしょう？",
    code: `type User = {
  id: number;
  name: string;
  email?: string; // オプショナルプロパティ
};

// User型からすべてのプロパティをオプショナルにするPartial型を自作
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// User型からすべてのプロパティを読み取り専用にするReadonly型を自作
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// MyPartialをMyReadonlyに適用
type PartiallyReadonlyUser = MyReadonly<MyPartial<User>>;

// PartiallyReadonlyUser型のオブジェクトを定義
const user: PartiallyReadonlyUser = {};

// 以下のコードは型エラーになるでしょうか？それとも実行できるでしょう？
// 実行できる場合、どのような出力になるでしょう？
user.id = 1; // ここが型エラーになるか？
user.name = "Alice"; // ここが型エラーになるか？
user.email = "alice@example.com"; // ここが型エラーになるか？

console.log(user.id);
console.log(user.name);
console.log(user.email);`,
    choices: [
      {id: "A", text: "すべての代入で型エラーが発生し、何も出力されない。"},
      {id: "B", text: "すべての代入は成功し、1、Alice、alice@example.com が出力される。"},
      {
        id: "C",
        text: 'user.id = 1; と user.name = "Alice"; は型エラーになるが、user.email = "alice@example.com"; は成功し、undefined、undefined、alice@example.com が出力される。',
      },
      {id: "D", text: "すべての代入は成功するが、console.log の結果は undefined、undefined、alice@example.com となる。"},
    ],
    correctAnswer: "A",
    explanation: `この問題は、\`Mapped Types\` (\`keyof T\` と \`P in keyof T\`)、オプショナルプロパティ、そして \`readonly\` 修飾子が複合的に作用する様子を理解しているかを問う、実践的な問題です。

1. **\`MyPartial<User>\` の型推論:**
   \`MyPartial<User>\` は、\`User\` 型のすべてのプロパティをオプショナルにします。
   \`\`\`ts
   type MyPartialUser = {
     id?: number;
     name?: string;
     email?: string;
   };
   \`\`\`

2. **MyReadonly<MyPartial<User>> の型推論:**
次に、MyReadonly が MyPartialUser に適用されます。MyReadonly は、引数として渡された型のすべてのプロパティを readonly にします。
\`\`\`ts
type PartiallyReadonlyUser = {
  readonly id?: number;
  readonly name?: string;
  readonly email?: string;
};
\`\`\`
重要な点: readonly 修飾子は、プロパティが読み取り専用であることを意味します。つまり、一度初期化されると、後から値を変更することはできません。

3. **const user: PartiallyReadonlyUser = {}; の挙動:**
user オブジェクトは、PartiallyReadonlyUser 型として定義されています。この型は、すべてのプロパティが readonly かつ optional です。
{} という空のオブジェクトで初期化された場合、id、name、email の各プロパティは初期値が設定されていません。

4. **代入操作と readonly:**
readonly プロパティに対しては、初期化時以外は値を代入できません。
user.id = 1;
user.name = "Alice";
user.email = "alice@example.com"; これらの行はすべて、readonly プロパティに対する再代入と見なされ、TypeScriptコンパイラによって型エラーとなります。 (Error: Cannot assign to 'id' because it is a read-only property.)

したがって、コードは実行されず、コンパイル時にエラーで停止します。

このクイズは、Mapped Types の強力さと、readonly 修飾子の厳密な意味、そしてそれらがオプショナルプロパティと組み合わされた場合の挙動を理解するための良い例です。実用的な場面では、Readonly<Partial<T>> のような型を生成する際に、この挙動を考慮する必要があります。`,
  },
}
