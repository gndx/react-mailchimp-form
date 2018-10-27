const fs = require('fs');
const path = require('path');

describe('Test if exist dist/index file', () => {
  test('It should exist index.js file after build npm script', (done) => {
    let exists = fs.existsSync(path.join(__dirname, '../dist/index.js'));
    if (exists) {
      done();
    }
  })
})