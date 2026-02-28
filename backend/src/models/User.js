import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: [{
        topic: String,
        score: Number,
        date: { type: Date, default: Date.now }
    }],
    currentDifficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
