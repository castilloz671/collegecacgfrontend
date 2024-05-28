import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../services/studentService';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data.$values);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error(`Error deleting student with id ${id}:`, error);
    }
  };

  return (
    <Container>
      <h1 className='my-4'>Student List</h1>
      <Button onClick={() => navigate('/create')} className='mb-3'>Add Student</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>LastName</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              <td>{student.lastName}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>{new Date(student.f_Nacimiento).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => navigate(`/edit/${student.studentId}`)} className="me-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={() => navigate(`/details/${student.studentId}`)} className="me-2">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button onClick={() => handleDelete(student.studentId)} variant="danger">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentList;
