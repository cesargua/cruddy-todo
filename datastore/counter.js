const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};


const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (cb) => {
  // counter = counter + 1
  readCounter((err, id)=>{
    id = id + 1;
    // counter = id;
    writeCounter(id, (err, idString)=>{
      // console.log('inside callback', idString)
      cb(err, idString);
    })
  })

  return counter;
};
//call readFile
    //retrieve the last id number
    //concat the previous id numbers with the current one, essentially creating a list of id numbers

//List of questions:
  //what is the mocha tests exactly doing
  //what would a callback look like in this scenario for writeFile
  //why is the first argmuent of the callback in fs.writeFull being passed in as null, is this just a placeholder?
  //^ are we storing/writing all counts, or just most recent
  //^ why are we storing the count separately from the data/items?
  //In what scenario would we use readFile, since we are only using getNextUNiqueID when we are creating a new item?


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
exports.zeroPaddedNumber = zeroPaddedNumber;
