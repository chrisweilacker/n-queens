// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rows = this.rows();
      var moreThanOnePiece = 0;
      for (var j = 0; j < rows[rowIndex].length; j++){
        if (rows[rowIndex][j] === 1) {
          moreThanOnePiece++;
        }
        if (moreThanOnePiece > 1) {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        var moreThanOnePiece = 0;
        for (var j = 0; j < rows[i].length; j++){
          if (rows[i][j] === 1) {
            moreThanOnePiece++;
          }
          if (moreThanOnePiece > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var columnHasPiece = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          if (columnHasPiece[colIndex] === true) {
            return true;
          } else {
            columnHasPiece[colIndex] = true;
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      var columnHasPiece = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          if (rows[i][j] === 1) {
            if (columnHasPiece[j] === true) {
              return true;
            } else {
              columnHasPiece[j] = true;
            }
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(cIFR) { //majorDiagonalColumnIndexAtFirstRow
      var rows = this.rows();
      var hasPiece = false;
      if (rows[0][cIFR] === 1) {
        hasPiece = true;
      }
      if (cIFR !== rows[0].length) {
        for (var nextDiagonal = (cIFR + 1); nextDiagonal < rows[0].length; nextDiagonal++) {
          var difference = (nextDiagonal - cIFR);
          if (rows[difference] !== undefined) {
            if (rows[difference][nextDiagonal] === 1) {
              if (hasPiece === false) {
                hasPiece = true;
              } else {
                return true;
              }
            }
          }

        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      for (var row = 0; row < rows.length; row++) {
        for (var column = rows[row].length -1 ; column >= 0; column--) {
          var hasPiece = false;
          if (rows[row][column] === 1) {
            hasPiece = true;
          }
          if (column !== rows[row].length) {
            for (var nextDiagonal = (column + 1); nextDiagonal < rows[row].length; nextDiagonal++) {
              var difference = (nextDiagonal - column);
              if (rows[row+difference] !== undefined) {
                if (rows[row + difference][nextDiagonal] === 1) {
                  if (hasPiece === false) {
                    hasPiece = true;
                  } else {
                    return true;
                  }
                }
              }

            }
          }
        }
      }
      // loop through each row
      // loop through each column

      // varialbe next index of diagnal loop by subtracting 1 from column going down to 0
      // check the rows[row  +( nextDiagonal - column)][nextDiagonal] if it has flip has piece = true if its 1
      // if this one find one return true;

      //
      return false; // fixme
    },
    // x x x x x
    // x x x x x
    // x x x x x
    // x x x x x
    // x x x x x


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(cIDFR) {  //minorDiagonalColumnIndexAtFirstRow
      var rows = this.rows();
      var hasPiece = false;
      if (rows[0][cIDFR] === 1) {
        hasPiece = true;
      }
      for (var nextDiagonal = (cIDFR-1); nextDiagonal >= 0; nextDiagonal--) {
        var difference = (cIDFR-nextDiagonal);
        if (rows[difference] !== undefined) {
          if (rows[difference][nextDiagonal] === 1) {
            if (hasPiece === false) {
              hasPiece = true;
            } else {
              return true;
            }
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      for (var row = 0; row < rows.length; row++) {
        for (var column = 0; column < rows[row].length; column++) {
          var hasPiece = false;
          if (rows[row][column] === 1) {
            hasPiece = true;
          }
          for (var nextDiagonal = (column-1); nextDiagonal >= 0; nextDiagonal--) {
            var difference = (column-nextDiagonal);
            if (rows[row+difference] !== undefined) {
              if (rows[row + difference][nextDiagonal] === 1) {
                if (hasPiece === false) {
                  hasPiece = true;
                } else {
                  return true;
                }
              }
            }
          }
        }

      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
