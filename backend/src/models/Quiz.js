import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswer: String,
    questionType: { type: String, enum: ['MCQ', 'Short Answer', 'Coding'] }
  }],
  answers: [{
    questionId: String,
    answerText: String,
    isCorrect: Boolean
  }],
  score: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
