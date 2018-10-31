/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var solutionBoard = undefined;
  var numberOfPieces = 0;
  var colConflicts = [];
  var rowConflicts = [];
  var startingColumn = 0;
  var startingRow = 0;

  while (numberOfPieces < n) {
    numberOfPieces = 0;

    if (startingColumn >= n) {
      startingColumn = 0;
      startingRow++;
    }

    solutionBoard = new Board({'n': n});
    for (var row = startingRow; row < n; row++) {
      for (var column = startingColumn; column < n; column++) {
        if (colConflicts.includes(column) || rowConflicts.includes(row)) {
          continue;
        }
        solutionBoard.togglePiece(row, column);
        // if (solutionBoard.hasAnyRooksConflicts()) {
        //   solutionBoard.togglePiece(row, column);
        // } else {
        numberOfPieces++;
        colConflicts.push(column);
        rowConflicts.push(row);
        column = n - 1;

      }
    }
    startingColumn++;
  }

  solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, startingBoard, startRow, startColumn, startingNumber, rowCon, colCon) {
  var solutionCount = 0;
  if (n===0 || n === 1) {
    return 1;
  }

  var solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
  var numberOfPieces = startingNumber ? startingNumber : 0;
  var colConflicts = colCon ? colCon : [];
  var rowConflicts = rowCon ? rowCon : [];
  var startingColumn = startColumn ? startColumn : 0;
  var startingRow = startRow ? startRow : 0;

  var nSS = [];

  while (startingRow <= n) {
    numberOfPieces = startingNumber ? startingNumber : 0;

    if (startingColumn === n) {
      //Go to the next row
      startingColumn = 0;
      startingRow++;

      //break if we have finished placing pieces or we have a row with no pieces
      if (startingRow === n ) {break;}
      if (startingRow > numberOfPieces) {break;}
    }

    solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
    for (var row = startingRow; row < n; row++) {
      for (var column = ((row > startingRow) ?  0 : startingColumn); column < n; column++) {

        //check if has row conflicts or column conflicts
        if (colConflicts.includes(column) || rowConflicts.includes(row)) {
          continue;
        }

        //Once we are about to place the second piece create another board to solve
        if (numberOfPieces >= 1) {

          nSS.push({});
          nSS[nSS.length -1].nextStartingRow = row;
          nSS[nSS.length -1].nextStartingColumn = column + 1;
          nSS[nSS.length -1].nextStartingNumber = numberOfPieces;

          //create a copy of the board
          theRows = solutionBoard.rows().slice(0);
          for (var i = 0; i<theRows.length; i++) {
            //change the reference to copies
            theRows[i] = theRows[i].slice(0);
          }

          //create the board from the new matrix
          nSS[nSS.length -1].nextStartingBoard = new Board (theRows);


          nSS[nSS.length -1].nextStartingRowConflicts = rowConflicts.slice(0);
          nSS[nSS.length -1].nextStartingColConflicts = colConflicts.slice(0);
          nSS[nSS.length -1].rows =  nSS[nSS.length -1].nextStartingBoard.rows().slice(0);
        }


        solutionBoard.togglePiece(row, column);
        numberOfPieces++;
        if (numberOfPieces === n) {
          solutionCount++;
        }
        colConflicts.push(column);
        rowConflicts.push(row);
      }
    }

    startingColumn++;
    rowConflicts = rowCon ? rowCon : [];
    colConflicts = colCon ? colCon : [];
  }

  for (var i = 0; i<nSS.length; i++) {
    solutionCount += countNRooksSolutions(n,
      nSS[i].nextStartingBoard,
      nSS[i].nextStartingRow,
      nSS[i].nextStartingColumn,
      nSS[i].nextStartingNumber,
      nSS[i].nextStartingRowConflicts,
      nSS[i].nextStartingColConflicts);
  }




  if (startRow === undefined) {
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  }

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, startingBoard, startRow, startColumn, startingNumber, rowCon, colCon) {

  var solution = [];
  var solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
  var numberOfPieces = startingNumber ? startingNumber : 0;
  var colConflicts = colCon ? colCon : [];
  var rowConflicts = rowCon ? rowCon : [];
  var startingColumn = startColumn ? startColumn : 0;
  var startingRow = startRow ? startRow : 0;

  var nSS = [];

  while (numberOfPieces < n) {
    numberOfPieces = startingNumber ? startingNumber : 0;

    if (startingColumn === n) {
      //Go to the next row
      startingColumn = 0;
      startingRow++;

      //break if we have finished placing pieces or we have a row with no pieces
      if (startingRow === n ) {break;}
      if (startingRow > numberOfPieces) {break;}
    }

    solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
    for (var row = startingRow; row < n; row++) {
      for (var column = ((row > startingRow) ?  0 : startingColumn); column < n; column++) {

        //check if has row conflicts or column conflicts
        if (colConflicts.includes(column) || rowConflicts.includes(row)) {
          continue;
        }

        //check for Diaganal Conflicts
        var hasDiagonalConflict = false;
        for (var i = 0; i < rowConflicts.length; i++) {
          if (colConflicts[i] === (column + (row - rowConflicts[i]))) {
            hasDiagonalConflict = true;
            break;
          }
          if (colConflicts[i] === (column - (row - rowConflicts[i]))) {
            hasDiagonalConflict = true;
            break;
          }
        }
        if (hasDiagonalConflict) {
          continue;
        }


        //Once we are about to place the second piece create another board to solve
        if (numberOfPieces >= 1) {

          nSS.push({});
          nSS[nSS.length -1].nextStartingRow = row;
          nSS[nSS.length -1].nextStartingColumn = column + 1;
          nSS[nSS.length -1].nextStartingNumber = numberOfPieces;

          //create a copy of the board
          theRows = solutionBoard.rows().slice(0);
          for (var i = 0; i<theRows.length; i++) {
            //change the reference to copies
            theRows[i] = theRows[i].slice(0);
          }

          //create the board from the new matrix
          nSS[nSS.length -1].nextStartingBoard = new Board (theRows);


          nSS[nSS.length -1].nextStartingRowConflicts = rowConflicts.slice(0);
          nSS[nSS.length -1].nextStartingColConflicts = colConflicts.slice(0);
          nSS[nSS.length -1].rows =  nSS[nSS.length -1].nextStartingBoard.rows().slice(0);
        }


        solutionBoard.togglePiece(row, column);
        numberOfPieces++;
        colConflicts.push(column);
        rowConflicts.push(row);
      }
    }
    startingColumn++;
    rowConflicts = rowCon ? rowCon : [];
    colConflicts = colCon ? colCon : [];
  }

  if (numberOfPieces >= n) {
    solution = solutionBoard.rows();
  } else {
    for (var i = 0; i<nSS.length; i++) {
      let nextPossibleSolution = findNQueensSolution(n,
        nSS[i].nextStartingBoard,
        nSS[i].nextStartingRow,
        nSS[i].nextStartingColumn,
        nSS[i].nextStartingNumber,
        nSS[i].nextStartingRowConflicts,
        nSS[i].nextStartingColConflicts);
      if (nextPossibleSolution.length > 0) {
        return nextPossibleSolution;
      }
    }
  }





  if (startRow === undefined && solution.length === 0) {
    var returnBoard = (new Board({'n': n}));
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(returnBoard.rows()));
    return returnBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, startingBoard, startRow, startColumn, startingNumber, rowCon, colCon) {
  var solutionCount = 0;
  if (n===0 || n ===1) {
    return 1;
  }

  var solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
  var numberOfPieces = startingNumber ? startingNumber : 0;
  var colConflicts = colCon ? colCon : [];
  var rowConflicts = rowCon ? rowCon : [];
  var startingColumn = startColumn ? startColumn : 0;
  var startingRow = startRow ? startRow : 0;

  var nSS = [];

  while (startingRow <= n) {
    numberOfPieces = startingNumber ? startingNumber : 0;

    if (startingColumn === n) {
      //Go to the next row
      startingColumn = 0;
      startingRow++;

      //break if we have finished placing pieces or we have a row with no pieces
      if (startingRow === n ) {break;}
      if (startingRow > numberOfPieces) {break;}
    }

    solutionBoard = startingBoard ? startingBoard : new Board({'n': n});
    for (var row = startingRow; row < n; row++) {
      for (var column = ((row > startingRow) ?  0 : startingColumn); column < n; column++) {

        //check if has row conflicts or column conflicts
        if (colConflicts.includes(column) || rowConflicts.includes(row)) {
          continue;
        }

        //check for Diaganal Conflicts
        var hasDiagonalConflict = false;
        for (var i = 0; i < rowConflicts.length; i++) {
          if (colConflicts[i] === (column + (row - rowConflicts[i]))) {
            hasDiagonalConflict = true;
            break;
          }
          if (colConflicts[i] === (column - (row - rowConflicts[i]))) {
            hasDiagonalConflict = true;
            break;
          }
        }
        if (hasDiagonalConflict) {
          continue;
        }


        //Once we are about to place the second piece create another board to solve
        if (numberOfPieces >= 1) {

          nSS.push({});
          nSS[nSS.length -1].nextStartingRow = row;
          nSS[nSS.length -1].nextStartingColumn = column + 1;
          nSS[nSS.length -1].nextStartingNumber = numberOfPieces;

          //create a copy of the board
          theRows = solutionBoard.rows().slice(0);
          for (var i = 0; i<theRows.length; i++) {
            //change the reference to copies
            theRows[i] = theRows[i].slice(0);
          }

          //create the board from the new matrix
          nSS[nSS.length -1].nextStartingBoard = new Board (theRows);


          nSS[nSS.length -1].nextStartingRowConflicts = rowConflicts.slice(0);
          nSS[nSS.length -1].nextStartingColConflicts = colConflicts.slice(0);
          nSS[nSS.length -1].rows =  nSS[nSS.length -1].nextStartingBoard.rows().slice(0);
        }


        solutionBoard.togglePiece(row, column);
        numberOfPieces++;
        if (numberOfPieces === n) {
          solutionCount++;
        }
        colConflicts.push(column);
        rowConflicts.push(row);
      }
    }

    startingColumn++;
    rowConflicts = rowCon ? rowCon : [];
    colConflicts = colCon ? colCon : [];
  }

  for (var i = 0; i<nSS.length; i++) {
    solutionCount += countNQueensSolutions(n,
      nSS[i].nextStartingBoard,
      nSS[i].nextStartingRow,
      nSS[i].nextStartingColumn,
      nSS[i].nextStartingNumber,
      nSS[i].nextStartingRowConflicts,
      nSS[i].nextStartingColConflicts);
  }




  if (startRow === undefined) {
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  }

  return solutionCount;
};
