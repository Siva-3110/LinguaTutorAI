// Service for handling chat logic
export const generateResponse = async (message) => {
    // Simulate network delay for realistic typing effect
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return dummy AI response
    return `This is a sample AI response for: "${message}"`;
};
