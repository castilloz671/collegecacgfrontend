import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import StudentDetails from '../components/StudentDetails';
import MonthlyGradeForm from '../components/MonthlyGradeForm';
import ExamForm from '../components/ExamForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<StudentList />} />
        <Route path="/create" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
        <Route path="/details/:id" element={<StudentDetails />} />
        <Route path="/addMonthlyGrade/:studentId/:subjectId" element={<MonthlyGradeForm />} />
        <Route path="/editMonthlyGrade/:studentId/:subjectId/:gradeId" element={<MonthlyGradeForm />} />
        <Route path="/addExam/:studentId/:subjectId" element={<ExamForm />} />
        <Route path="/editExam/:studentId/:subjectId/:examId" element={<ExamForm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
