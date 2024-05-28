import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudent } from '../services/studentService';
import { Container, Button, Table } from 'react-bootstrap';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      if (id) {
        const response = await getStudent(id);
        setStudent(response.data);
      }
    };

    loadStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Student Details</h1>
      <div className='mb-3'>
        <strong>Name:</strong> {student.name}
      </div>
      <div className='mb-3'>
        <strong>LastName:</strong> {student.lastName}
      </div>
      <div className='mb-3'>
        <strong>Phone:</strong> {student.phone}
      </div>
      <div className='mb-3'>
        <strong>Address:</strong> {student.address}
      </div>
      <div className='mb-3'>
        <strong>Birth Date:</strong> {new Date(student.f_Nacimiento).toLocaleDateString()}
      </div>
      <Button onClick={() => navigate(`/edit/${student.studentId}`)} className='me-2'>Edit</Button>
      <Button variant="secondary" onClick={() => navigate('/')}>Back</Button>

      <h2 className='mt-4'>Semesters</h2>
      {student.semesters.$values.map(semester => (
        <div key={semester.semesterId}>
          <h3>Semester {semester.semesterId}</h3>
          <h4>Subjects</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Monthly Grades</th>
                <th>Exams</th>
                <th>Final Grade</th>
                <th>Passed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {semester.subjects.$values.map(subject => (
                <tr key={subject.subjectId}>
                  <td>{subject.name}</td>
                  <td>{subject.monthlyGrades.$values.map(grade => grade.grade).join(", ")}</td>
                  <td>{subject.exams.$values.map(exam => exam.grade).join(", ")}</td>
                  <td>{subject.finalGrade}</td>
                  <td>{subject.isPassed ? 'Yes' : 'No'}</td>
                  <td>
                    <Button onClick={() => navigate(`/addMonthlyGrade/${student.studentId}/${subject.subjectId}`)} className="me-2">
                      Add Monthly Grade
                    </Button>
                    <Button onClick={() => navigate(`/addExam/${student.studentId}/${subject.subjectId}`)} className="me-2">
                      Add Exam
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </Container>
  );
}

export default StudentDetails;
