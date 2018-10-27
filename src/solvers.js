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
        if (solutionBoard.hasAnyRooksConflicts()) {
          solutionBoard.togglePiece(row, column);
        } else {
          numberOfPieces++;
          colConflicts.push(column);
          rowConflicts.push(row);
          column = n - 1;
        }
      }
    }
    startingColumn++;
  }

  solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = undefined; //fixme
  var solutionBoard = new Board({'n': n});
  var numberOfPieces = 0;
  var colConflicts = [];
  var rowConflicts = [];
  var startingColumn = 0;
  var startingRow = 0;

  debugger;
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
        if (solutionBoard.hasAnyQueensConflicts()) {
          solutionBoard.togglePiece(row, column);
        } else {
          numberOfPieces++;
          colConflicts.push(column);
          rowConflicts.push(row);
          column = n - 1;
        }
      }
    }
    startingColumn++;
    rowConflicts = [];
    colConflicts = [];
  }

  solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
