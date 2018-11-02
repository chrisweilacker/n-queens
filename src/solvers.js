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
  var solution = [];

  var checkRow = function(row, colConflicts){

    var colCon = colConflicts ? colConflicts.slice(0) : [];

    if(n === row){
      return colCon;
    } else {

      for(var col = 0; col < n; col++){

        if(checkRookConflicts(colCon, row, col)){

          colCon.push(col);
          var checkSolution = checkRow(row + 1, colCon);

          if (checkSolution.length === n) {
            return checkSolution;
          }
      
          colCon.pop();
        }
      }
      return [];
    }
  };

  var solutionPieces = checkRow(0, []);
  for (var rowInd = 0; rowInd < n; rowInd++) {
    solution.push([]);
    for(var colInd = 0; colInd < n; colInd++) {
      if (solutionPieces[rowInd] === colInd) {
        solution[rowInd][colInd] = 1;
      } else {
        solution[rowInd][colInd] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, startingBoard, startRow, startColumn, startingNumber, rowCon, colCon) {
  var solutionCount = 0;

  var checkRow = function(row, colConflicts){

    var colCon = colConflicts ? colConflicts.slice(0) : [];

    if(n === row){
      solutionCount++;
    } else {

      for(var col = 0; col < n; col++){

        if(checkRookConflicts(colCon, row, col)){
          colCon.push(col);

          checkRow(row + 1, colCon);

          colCon.pop();
        }
      }

    }
  };

  checkRow(0, []);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = [];

  var checkRow = function(row, colConflicts){

    var colCon = colConflicts ? colConflicts.slice(0) : [];

    if(n === row){
      return colCon;
    } else {

      for(var col = 0; col < n; col++){

        if(checkQueenConflicts(colCon, row, col)){

          colCon.push(col);
          var checkSolution = checkRow(row + 1, colCon);

          if (checkSolution.length === n) {
            return checkSolution;
          }
      
          colCon.pop();
        }
      }
      return [];
    }
  };

  var solutionPieces = checkRow(0, []);
  for (var rowInd = 0; rowInd < n; rowInd++) {
    solution.push([]);
    for(var colInd = 0; colInd < n; colInd++) {
      if (solutionPieces[rowInd] === colInd) {
        solution[rowInd][colInd] = 1;
      } else {
        solution[rowInd][colInd] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.checkRookConflicts = function(colConflicts, row, column) {

  if (colConflicts.includes(column)) {
    return false;
  }

  return true;
};

window.checkQueenConflicts = function(colConflicts, row, column) {

  if (colConflicts.includes(column)) {
    return false;
  }

  for (var i = 0; i < colConflicts.length; i++) {
    //pieces should be located on [i, ColConflicts[i]]
    var diff = (row - i);

    if (colConflicts[i] === (column + diff)) {
      return false;
    } else if (colConflicts[i] === (column - diff)) {
      return false;
    }
  }

  return true;
};

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var checkRow = function(row, colConflicts){

    var colCon = colConflicts ? colConflicts.slice(0) : [];

    if(n === row){
      solutionCount++;
    } else {

      for(var col = 0; col < n; col++){

        if(checkQueenConflicts(colCon, row, col)){
          colCon.push(col);

          checkRow(row + 1, colCon);

          colCon.pop();
        }
      }

    }
  };

  checkRow(0, []);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
