const API_BASE_URL = 'http://localhost:5000/api';

export const sendMessageToAPI = async (message, language, subject, history) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, language, subject, history }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
    }

    return data;
};
