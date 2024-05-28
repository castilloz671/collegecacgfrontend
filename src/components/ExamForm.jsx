import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExam, createExam, updateExam } from '../services/studentService';
import { Container, Form, Button } from 'react-bootstrap';

const ExamForm = () => {
  const { studentId, subjectId, examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    subjectId: parseInt(subjectId, 10),
    examName: '',
    grade: 0
  });

  useEffect(() => {
    if (examId) {
      const loadExam = async () => {
        const response = await getExam(subjectId, examId);
        setExam(response.data);
      };
      loadExam();
    }
  }, [examId, subjectId]); // Añadir subjectId aquí

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (examId) {
      await updateExam(subjectId, examId, exam);
    } else {
      await createExam(subjectId, exam);
    }
    navigate(`/details/${studentId}`);
  };

  return (
    <Container>
      <h1>{examId ? 'Edit Exam' : 'Add Exam'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Exam Name</Form.Label>
          <Form.Control type="text" name="examName" value={exam.examName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Control type="number" name="grade" value={exam.grade} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default ExamForm;
