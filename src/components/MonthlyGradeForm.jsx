import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMonthlyGrade, createMonthlyGrade, updateMonthlyGrade } from '../services/studentService';
import { Container, Form, Button } from 'react-bootstrap';

const MonthlyGradeForm = () => {
  const { studentId, subjectId, gradeId } = useParams();
  const navigate = useNavigate();
  const [grade, setGrade] = useState({
    subjectId: parseInt(subjectId, 10),
    month: '',
    grade: 0
  });

  useEffect(() => {
    if (gradeId) {
      const loadGrade = async () => {
        const response = await getMonthlyGrade(subjectId, gradeId);
        setGrade(response.data);
      };
      loadGrade();
    }
  }, [gradeId, subjectId]); // Añadir subjectId aquí

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gradeId) {
      await updateMonthlyGrade(subjectId, gradeId, grade);
    } else {
      await createMonthlyGrade(subjectId, grade);
    }
    navigate(`/details/${studentId}`);
  };

  return (
    <Container>
      <h1>{gradeId ? 'Edit Monthly Grade' : 'Add Monthly Grade'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Month</Form.Label>
          <Form.Control type="number" name="month" value={grade.month} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Control type="number" name="grade" value={grade.grade} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default MonthlyGradeForm;
