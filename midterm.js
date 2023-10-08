class Lexer {
  constructor(input) {
    this.input = input;
    this.tokens = [];
    this.keywords = new Set(["void", "int", "for"]);
  }

  tokenize() {
    const tokenRegex = /\s*(?:(\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)|([a-zA-Z_][a-zA-Z0-9_]*)|([()+;=:{}<>]|<=|>=|==|!=))/;

    let match;

    while (this.input.length > 0) {
      match = this.input.match(tokenRegex);

      if (match) {
        this.input = this.input.substring(match[0].length);

        if (match[1]) {
          this.tokens.push({ type: "num", value: match[1] });
        } else if (match[2]) {
          if (this.keywords.has(match[2])) {
            this.tokens.push({ type: "keyword", value: match[2] });
          } else {
            this.tokens.push({ type: "identifier", value: match[2] });
          }
        } else if (match[3]) {
          this.tokens.push({ type: match[3], value: match[3] });
        }
      } else {
        // Skip invalid characters
        this.input = this.input.substring(1);
      }
    }

    return this.tokens;
  }
}

const sourceCode = `
  void main ()
  {
    int sum = 0;
    for(int j=0; j < 10; j=j+1)
    {
        sum = sum + j + 10.43 + 34E4 + 45.34E-4 + E43 + .34;
    }
  }
  `;

const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();

for (const token of tokens) {
  // Skip whitespace & newline 
  if (token.type === "whitespace" || token.type === "newline") {
    continue;
  }
  console.log(`${token.type} : ${token.value}`);
}