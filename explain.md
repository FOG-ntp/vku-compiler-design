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