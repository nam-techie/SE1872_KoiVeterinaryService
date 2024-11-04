export const login = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Kiểm tra content-type của response
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            // Nếu không phải JSON, đọc như text
            data = await response.text();
        }

        if (!response.ok) {
            throw new Error(data);
        }

        return data;
    } catch (error) {
        throw error;
    }
};
