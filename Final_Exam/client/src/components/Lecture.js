'use strict'

/* {Code:02GOLOV
    Name:Architetture dei sistemi di elaborazione 
    Credits:12
    Max Students:75
    Incompatible with: 02LSEOV
    Prepatory Course: 
}  */ 

function Lecture (course_id,code , name , credit, max_student, incompatible_with, prepatory_course,enrolled_student){
    this.course_id= course_id;
    this.code = code;
    this.name = name;
    this.credit = credit;
    this.max_student = max_student;
    this.incompatible_with = incompatible_with;
    this.prepatory_course = prepatory_course  ;
    this.enrolled_student = enrolled_student;
    
}

exports.Lecture = Lecture ;