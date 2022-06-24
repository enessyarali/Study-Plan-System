const sqlite = require('sqlite3');


const { Lecture } = require('./Lecture');

const db = new sqlite.Database('deneme.db', err => { if (err) throw err;}); 

// get all Available Lectures
exports.getlectures = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Lectures order by name ASC';
      db.all(sql, [], (err, rows) => {
        if(err)
          reject(err);
        else {
          const lectures = rows.map(row => new Lecture( row.course_id,row.code,row.name,row.credit,row.max_student,row.incompatible_with,row.prepatory_course,row.enrolled_student));
          resolve(lectures);
        }
      });
    });
  };

  exports.getcurrentstudyplan = (student_id) => { 
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Lectures INNER JOIN enrollment ON Lectures.course_id=enrollment.course_id WHERE student_id=?';
      db.all(sql, [student_id], (err, rows) => {
        if(err){
          reject(err)}
        else {
          const lectures = rows.map(row => new Lecture( row.course_id,row.code,row.name,row.credit,row.max_student,row.incompatible_with,row.prepatory_course,row.enrolled_student));
          resolve(lectures);
        }
      });
    });
  };

  exports.gettemporary_list = (student_id) => { 
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Lectures INNER JOIN temporary_list ON Lectures.course_id=temporary_list.course_id WHERE student_id=?';
      db.all(sql, [student_id], (err, rows) => {
        if(err){
          reject(err)}
        else {
          const lectures = rows.map(row => new Lecture( row.course_id,row.code,row.name,row.credit,row.max_student,row.incompatible_with,row.prepatory_course,row.enrolled_student));
          resolve(lectures);
        }
      });
    });
  };  

  exports.getEnrolledStudents = (course_id) => { 
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Lectures INNER JOIN temporary_list ON Lectures.course_id=temporary_list.course_id WHERE student_id=?';
      db.all(sql, [student_id], (err, rows) => {
        if(err){
          reject(err)}
        else {
          const lectures = rows.map(row => new Lecture( row.course_id,row.code,row.name,row.credit,row.max_student,row.incompatible_with,row.prepatory_course));
          resolve(lectures);
        }
      });
    });
  };  

  exports.copytable = (student_id)=> { 
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO temporary_list (student_id,course_id) SELECT student_id,course_id FROM enrollment WHERE enrollment.student_id=?"
      db.run(sql, [student_id], (err, rows) => {
        if(err)
          reject(err);
        else {
          resolve(rows);
        }
      });
    });
  };
  

exports.addlectureintotemporary = (student_id,course_id)=> { 
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO temporary_list (student_id,course_id) VALUES(?,?)" 
    db.run(sql, [student_id,course_id], (err, rows) => {
      if(err)
        reject(err);
      else {
        resolve(null);
      }
    });
  });
};

exports.mergetemporarytable = ()=> { 
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO enrollment SELECT * FROM  temporary_list"
    db.run(sql, [], (err, rows) => {
      if(err)
        reject(err);
      else {
        resolve(null);
      }
    });
  });
};

exports.clearpreviouslectures = (student_id)=> { 
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM enrollment WHERE student_id=?"
    db.run(sql, [student_id], (err, rows) => {
      if(err)
        reject(err);
      else {
        resolve(rows) 
      }
    });
  });
};

exports.deletelecturetemp = (student_id,course_id)=> { 
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM temporary_list WHERE student_id=? AND course_id=?"
    db.run(sql, [student_id,course_id], (err, rows) => {
      if(err)
        reject(err);
      else {
        resolve(rows) 
      }
    });
  });
};

exports.cleartemporarylist = () => {
  return new Promise((resolve, reject) => { 
    const sql = "DELETE FROM temporary_list"  
    db.run(sql, [], (err, rows) => {
      if(err)
        reject(err);
        else {
          resolve(rows)
        }
    });
  });
}; 


exports.deletestudyplan = (student_id) => {
  return new Promise((resolve, reject) => { 
    const sql = "DELETE FROM enrollment WHERE student_id=?"  
    db.run(sql, [student_id], (err, rows) => {
      if(err)
        reject(err);
        else {
          resolve(rows)
        }
    });
  });
}; 

exports.settime = (time,id) => {
  return new Promise((resolve, reject) => { 
    const sql = "UPDATE user SET partfull=? WHERE id=?"  
    db.run(sql, [time,id], (err, rows) => {
      if(err)
        reject(err);
        else {
          resolve(rows)
        }
    });
  });
}; 


exports.incrementenrolled = (course_id) => {
  return new Promise((resolve, reject) => { 
    const sql = "UPDATE Lectures SET enrolled_student = enrolled_student + 1 WHERE course_id=?"  
    db.run(sql, [course_id], (err, rows) => {
      if(err)
        reject(err);
        else {
          resolve(rows)
        }
    });
  });
}; 

exports.decrementenrolled = (course_id) => {
  return new Promise((resolve, reject) => { 
    const sql = "UPDATE Lectures SET enrolled_student = enrolled_student - 1 WHERE course_id=?"  
    db.run(sql, [course_id], (err, rows) => {
      if(err)
        reject(err);
        else {
          resolve(rows)
        }
    });
  });
}; 
