const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

//^define getNextUniqueIdPromise up here, var id = getNextUniqueIdPromise.then(return idString)

exports.create = (text, callback) => {

  counter.getNextUniqueId((err,id) => { //promises?
    // console.log("inside getNextUniqueID callback", id)
    items[id] = text;
    //use WriteFile
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err)=> {
      if(err){
        throw ('Could not create new todo text file')
      }else{
        callback(null, { id, text });
      }
    })
  });

  //use writeFile
  // console.log("outside callback", id);
  //^ use idString as name to writeFile in /datastore/data that contains text
// fs.writeFile(idString)

};

exports.readAll = (callback) => {
  // fs.readFile

  fs.readdir(exports.dataDir, (err,files)=>{
    if(err){
      throw ('could not read all the files')
    } else{
      var data = _.map(files,(fileName)=>{
        let id= fileName.replace('.txt','')
        return {'id': id, 'text': id}
      })
      callback(null, data);
    }
  })

  // var data = _.map(items, (text, id) => {
  // //^ fs.readdir(exports.dataDir, cb)
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  // console.log(id)
  // var text = items[id];
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err,fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      var text= fileData.toString()
      callback(null, { id, text});
    }
  })
};

exports.update = (id, text, callback) => {
  // console.log(id)
  let filePath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile( filePath, (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile( filePath, text, (err) => {
        if(err){
          throw ('could not write to file')
        } else {
          callback(null, { id, text });
          items[id] = text;

        }
      })
    }
  })

  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  // }
};

exports.delete = (id, callback) => {
  let filePath = path.join(exports.dataDir, `${id}.txt`);

  fs.unlink(filePath, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  })
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
    // callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }

  //use fs.unlink
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
