export const login = async (email, password) => {
  try {
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Đăng nhập thất bại');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw error; 
  }
};
