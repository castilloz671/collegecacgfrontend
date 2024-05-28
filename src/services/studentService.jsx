import axios from 'axios';

const API_URL = 'https://localhost:44398/api/Students';

// Students
export const getStudents = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudent = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error fetching student with id ${id}:`, error);
    throw error;
  }
};

export const createStudent = async (student) => {
  try {
    return await axios.post(API_URL, student);
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    return await axios.put(`${API_URL}/${id}`, student);
  } catch (error) {
    console.error(`Error updating student with id ${id}:`, error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting student with id ${id}:`, error);
    throw error;
  }
};

// Monthly Grades
export const getMonthlyGrade = async (subjectId, gradeId) => {
  try {
    return await axios.get(`${API_URL}/${subjectId}/monthlyGrades/${gradeId}`);
  } catch (error) {
    console.error(`Error fetching monthly grade with id ${gradeId}:`, error);
    throw error;
  }
};

export const createMonthlyGrade = async (subjectId, grade) => {
  try {
    return await axios.post(`${API_URL}/${subjectId}/monthlyGrades`, grade);
  } catch (error) {
    console.error("Error creating monthly grade:", error);
    throw error;
  }
};

export const updateMonthlyGrade = async (subjectId, gradeId, grade) => {
  try {
    return await axios.put(`${API_URL}/${subjectId}/monthlyGrades/${gradeId}`, grade);
  } catch (error) {
    console.error(`Error updating monthly grade with id ${gradeId}:`, error);
    throw error;
  }
};

export const deleteMonthlyGrade = async (subjectId, gradeId) => {
  try {
    return await axios.delete(`${API_URL}/${subjectId}/monthlyGrades/${gradeId}`);
  } catch (error) {
    console.error(`Error deleting monthly grade with id ${gradeId}:`, error);
    throw error;
  }
};

// Exams
export const getExam = async (subjectId, examId) => {
  try {
    return await axios.get(`${API_URL}/${subjectId}/exams/${examId}`);
  } catch (error) {
    console.error(`Error fetching exam with id ${examId}:`, error);
    throw error;
  }
};

export const createExam = async (subjectId, exam) => {
  try {
    return await axios.post(`${API_URL}/${subjectId}/exams`, exam);
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

export const updateExam = async (subjectId, examId, exam) => {
  try {
    return await axios.put(`${API_URL}/${subjectId}/exams/${examId}`, exam);
  } catch (error) {
    console.error(`Error updating exam with id ${examId}:`, error);
    throw error;
  }
};

export const deleteExam = async (subjectId, examId) => {
  try {
    return await axios.delete(`${API_URL}/${subjectId}/exams/${examId}`);
  } catch (error) {
    console.error(`Error deleting exam with id ${examId}:`, error);
    throw error;
  }
};

export const calculateFinalGrade = async (studentId) => {
  try {
    return await axios.post(`${API_URL}/CalculateFinalGrade/${studentId}`);
  } catch (error) {
    console.error(`Error calculating final grade for student with id ${studentId}:`, error);
    throw error;
  }
};
