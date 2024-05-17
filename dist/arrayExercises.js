"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageAge = exports.sortStudentsByGrade = exports.getStudentNames = exports.filterPassedStudents = exports.students = void 0;
// src/arrayExercises.ts
exports.students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}
exports.filterPassedStudents = filterPassedStudents;
function getStudentNames(students) {
    return students.map(student => student.name);
}
exports.getStudentNames = getStudentNames;
function sortStudentsByGrade(students) {
    return students.sort((a, b) => a.grade - b.grade);
}
exports.sortStudentsByGrade = sortStudentsByGrade;
function getAverageAge(students) {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / students.length;
}
exports.getAverageAge = getAverageAge;
