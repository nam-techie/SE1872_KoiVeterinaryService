export const login = async (username, password) => {
    try {
        const response = await fetch('https://se1872koiveterinaryservice-production-deb1.up.railway.app/api/login', {
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
