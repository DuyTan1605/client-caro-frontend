function calculateWinner(squares, i, j, row, column) {

    const boardRow = parseInt(row);
    const boardCol = parseInt(column);
    let b = [];
    let dem = 0;
    for (let i1 = 0; i1 < boardRow; i1++) {
      let temp = [];
      for (let i2 = 0; i2 < boardCol; i2++) {
        temp.push(squares[dem]);
        dem++;
      }
      b.push(temp);
    }
    if (i != -1 && j != -1 && b[i][j] != null) {
      let d = [], k = i, h;
      // kiểm tra hàng
      while (b[k][j] == b[i][j]) {
        d.push(k * boardCol + j);
        k++;
        if (k == boardRow) {
          break;
        }
      }
      k = i - 1;
  
      if (k >= 0) {
        while (b[k][j] == b[i][j]) {
          d.push(k * boardCol + j);
          k--;
          if (k < 0) {
            break;
          }
        }
      }
      if (d.length >4) {
        return {
          winner: b[i][j],
          line: d,
          isDraw: false
        };
      }
      d = []; h = j;
      // kiểm tra cột
      while (b[i][h] == b[i][j]) {
        d.push(boardCol * i + h);
        h++;
        if (h == boardCol) {
          break;
        }
      }
  
      h = j - 1;
      if (h >= 0) {
        while (b[i][h] == b[i][j]) {
          d.push(boardCol * i + h);
          h--;
          if (h < 0) {
            break;
          }
        }
      }
      if (d.length >4) {
        return {
          winner: b[i][j],
          line: d,
          isDraw: false
        };
      }
      // kiểm tra đường chéo 1
      h = i; k = j; d = [];
      while (b[i][j] == b[h][k]) {
        d.push(boardCol * h + k);
        h++;
        k++;
        if (h == boardRow || k == boardCol) {
          break;
        }
      }
      h = i - 1; k = j - 1;
      if (h >= 0 && k >= 0) {
        while (b[i][j] == b[h][k]) {
          d.push(boardCol * h + k);
          h--;
          k--;
          if (h < 0 || k < 0) {
            break;
          }
        }
      }
  
      if (d.length >4) {
        return {
          winner: b[i][j],
          line: d,
          isDraw: false
        };
      }
      // kiểm tra đường chéo 2
      h = i; k = j; d = [];
      while (b[i][j] == b[h][k]) {
        d.push(boardCol * h + k);
        h++;
        k--;
        if (h == boardRow || k < 0) {
          break;
        }
      }
      h = i - 1; k = j + 1;
      if (h >= 0 && k < 3) {
        while (b[i][j] == b[h][k]) {
          d.push(boardCol * h + k);
          h--;
          k++;
          if (h < 0 || k == boardCol) {
            break
          }
        }
      }
      if (d.length >4) {
        return {
          winner: b[i][j],
          line: d,
          isDraw: false
        };
      }
    }
    let isDraw = true;
    for (let i1 = 0; i1 < boardCol * boardRow; i1++) {
      if (squares[i1] === null) {
        isDraw = false;
        break;
      }
    }
    return {
      winner: null,
      line: null,
      isDraw: isDraw,
    };
  
  }
  export default calculateWinner
  