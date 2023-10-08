```javascript
class Lexer {
  constructor(input) {
    this.input = input;
    this.tokens = [];
    this.keywords = new Set(["void", "int", "for"]);
  }
```
class Lexer {: Khai báo một lớp có tên là Lexer.

constructor(input) {: Khai báo hàm xây dựng (constructor) của lớp Lexer, nhận một đối số là input, đại diện cho chuỗi mã nguồn cần phân tích.

this.input = input;: Gán giá trị đối số input cho thuộc tính input của đối tượng Lexer. Điều này cho phép lớp Lexer sử dụng input trong toàn bộ lớp.

this.tokens = [];: Khởi tạo một mảng rỗng tokens để lưu trữ các token sau khi phân tích.

this.keywords = new Set(["void", "int", "for"]);: Khởi tạo một Set (tập hợp) chứa các từ khóa ngôn ngữ (ở đây là "void", "int", "for") để xác định các từ khóa trong mã nguồn.

```javascript
  tokenize() {
    const tokenRegex = /\s*(?:(\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)|([a-zA-Z_][a-zA-Z0-9_]*)|([()+;=:{}<>]|<=|>=|==|!=))/;
```
tokenize() {: Định nghĩa một phương thức tokenize cho lớp Lexer.

const tokenRegex = /\s*(?:(\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)|([a-zA-Z_][a-zA-Z0-9_]*)|([()+;=:{}<>]|<=|>=|==|!=))/;: Đây là biểu thức chính quy (regex) được sử dụng để xác định cấu trúc của token trong mã nguồn. Biểu thức này phân tách các loại token, bao gồm số (number), từ khóa (keyword), biểu tượng (symbol), và các trường hợp đặc biệt như <=, >=, ==, !=.

```javascript
    let match;
```
let match;: Khai báo biến match để lưu trữ kết quả tìm kiếm từ việc sử dụng biểu thức chính quy tokenRegex.

```javascript
   match = this.input.match(tokenRegex);
```
match = this.input.match(tokenRegex);: Sử dụng biểu thức chính quy tokenRegex để tìm kiếm các token trong input. Kết quả tìm kiếm được gán vào biến match.

```javascript
   if (match) {
```
if (match) {: Kiểm tra nếu có kết quả từ việc tìm kiếm (biểu thức chính quy đã khớp với một token), thực hiện các bước sau:

```javascript
    this.input = this.input.substring(match[0].length);
```
this.input = this.input.substring(match[0].length);: Cắt bỏ phần mã nguồn đã được phân tích (đã được tìm thấy) bằng cách cắt độ dài của token khớp từ đầu chuỗi input. Điều này loại bỏ token đã phân tích ra khỏi input để tiếp tục tìm token tiếp theo.
```javascript
        if (match[1]) {
          this.tokens.push({ type: "num", value: match[1] });
```
Nếu match[1] tồn tại, tức là biểu thức chính quy đã khớp với một số (number), thì thêm một đối tượng mới vào mảng tokens với type là "num" và value là giá trị của số.
```javascript
        } else if (match[2]) {
```
Nếu match[2] tồn tại, tức là biểu thức chính quy đã khớp với một từ (identifier), thực hiện các bước sau:
```javascript
          if (this.keywords.has(match[2])) {
            this.tokens.push({ type: "keyword", value: match[2] });
          } else {
            this.tokens.push({ type: "identifier", value: match[2] });
          }
```
Kiểm tra nếu từ khóa (match[2]) có trong tập hợp keywords, nếu có thì thêm một đối tượng mới vào mảng tokens với type là "keyword" và value là giá trị từ khóa. Ngược lại, thêm một đối tượng mới với type là "identifier" và value là giá trị của từ.
```javascript
        } else if (match[3]) {
```
Nếu match[3] tồn tại, tức là biểu thức chính quy đã khớp với một biểu tượng (symbol), thì thêm một đối tượng mới vào mảng tokens với type và value là giá trị của biểu tượng.
```javascript
        }
      } else {
```
Nếu không có kết quả từ việc tìm kiếm (biểu thức chính quy không khớp với bất kỳ token nào), thực hiện các bước sau:
```javascript
        // Skip invalid characters
        this.input = this.input.substring(1);
      }
    }
```
Cắt bỏ ký tự đầu tiên trong input bằng cách cắt độ dài 1, để loại bỏ các ký tự không xác định.
```javascript
    return this.tokens;
  }
}
```
Kết thúc phương thức tokenize và trả về mảng tokens sau khi đã phân tích xong mã nguồn.
Cuối cùng, chương trình sử dụng lớp Lexer để phân tích mã nguồn và in ra kết quả:
```javascript
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

```
Đoạn mã nguồn sourceCode chứa chuỗi mã nguồn đầu vào.

Một thể hiện của lớp Lexer được khởi tạo với mã nguồn đó.

Phương thức tokenize() của Lexer được gọi để phân tích mã nguồn thành các token.

Sau đó, vòng lặp for-of được sử dụng để duyệt qua mảng các token và in ra kết quả. Trong quá trình in, các khoảng trắng và dòng mới được bỏ qua bằng điều kiện if (token.type === "whitespace" || token.type === "newline").

Như vậy, chương trình hoạt động bằng cách phân tách chuỗi mã nguồn thành các token và in ra chúng một cách phù hợp với loại và giá trị của mỗi token.




