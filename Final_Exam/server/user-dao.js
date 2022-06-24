const sqlite = require('sqlite3');
const crypto = require('crypto')


const db = new sqlite.Database('deneme.db', err => { if (err) throw err;});

// verify the user 
exports.getUser = (email,password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email=?';
      db.get(sql, [email], (err, row) => {
        if(err){
          reject(err);}
        else if(row===undefined) {
          resolve(false);
        }else{
            const user = {id : row.id ,username : row.email,name : row.name,partfull:row.partfull}
            crypto.scrypt(password,row.salt,32,function(err,hashedPassword){
                if(err) reject(err);

                if(crypto.timingSafeEqual(Buffer.from(row.password,'hex') ,hashedPassword)){
                    resolve(user)
                }else resolve(false);   
            })
        }

      });
    });
  };