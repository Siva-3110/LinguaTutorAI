import express from 'express';
import { generateQuiz } from '../services/quizService.js';
import Quiz from '../models/Quiz.js';
import { checkPlagiarism } from '../services/plagiarismService.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const { topic, difficulty, numQuestions } = req.body;

        if (!topic || !difficulty) {
            return res.status(400).json({ success: false, error: 'topic and difficulty are required' });
        }

        const quizData = await generateQuiz(topic, difficulty, numQuestions || 5);
        res.json({ success: true, quiz: quizData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to generate quiz' });
    }
});

// Submit a quiz, compute score and check plagiarism
router.post('/submit', async (req, res) => {
    try {
        const { userId, questions, userAnswers } = req.body;

        let totalScore = 0;
        const processedAnswers = [];

        // Simulate some source texts for plagiarism depending on the topic/subject (this is a mock)
        const mockSourceTexts = [
            "Functions are building blocks",
            "Hola means hello in Spanish",
            "The mitochondria is the powerhouse of the cell"
        ];

        let maxPlagiarismScore = 0;

        userAnswers.forEach((answer) => {
            // Find the corresponding question
            const question = questions.find(q => q.questionText === answer.questionText);
            let isCorrect = false;

            if (question) {
                if (question.questionType === 'MCQ') {
                    isCorrect = answer.answerText === question.correctAnswer;
                } else {
                    // Short Answer or Coding. Let's do a basic includes check for now or strict equality
                    isCorrect = answer.answerText.toLowerCase().includes(question.correctAnswer.toLowerCase());
                }

                // Plagiarism check for short answers and coding
                if (question.questionType !== 'MCQ') {
                    const plagScore = checkPlagiarism(answer.answerText, mockSourceTexts);
                    if (plagScore > maxPlagiarismScore) {
                        maxPlagiarismScore = plagScore;
                    }
                }
            }

            if (isCorrect) totalScore += 1;

            processedAnswers.push({
                questionId: question ? question.questionText : 'unknown',
                answerText: answer.answerText,
                isCorrect
            });
        });

        // Score out of 100
        const finalScore = Math.round((totalScore / questions.length) * 100);

        const quizRecord = new Quiz({
            userId,
            questions,
            answers: processedAnswers,
            score: finalScore
        });

        await quizRecord.save();

        res.json({ success: true, score: finalScore, plagiarismScore: maxPlagiarismScore, quizId: quizRecord._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to submit quiz' });
    }
});

export default router;
