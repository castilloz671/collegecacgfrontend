import React, { useState, useEffect } from 'react';
import { getStudent, createStudent, updateStudent } from '../services/studentService';
import { Form, Button, Container, FormControl } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const StudentForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    lastName: '',
    phone: '',
    address: '',
    f_Nacimiento: ''
  });

  useEffect(() => {
    const loadStudents = async () => {
      if (id) {
        const response = await getStudent(id);
        setStudent(response.data);
      }      
    };

    loadStudents();
  },  [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateStudent(id, student);
    } else {
      await createStudent(student);
    }
    navigate('/');
  };

  return (
    <Container>
      <h1>{id ? 'Edit Student': 'Add Student'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <FormControl
            type='text'
            name='name'
            value={student.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>LastName</Form.Label>
          <FormControl
            type='text'
            name='lastName'
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Phone</Form.Label>
          <FormControl
            type='text'
            name='phone'
            value={student.phone}
            onChange={handleChange}
            maxLength="10"
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label>
          <FormControl
            type='text'
            name='address'
            value={student.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Birth Date</Form.Label>
          <FormControl
            type='date'
            name='f_Nacimiento'
            value={student.f_Nacimiento}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type='sumit' className='me-2'>Save</Button>
        <Button variant='secondary' onClick={() => navigate('/')}>Cancel</Button>
      </Form>
    </Container>
  );
};

export default StudentForm