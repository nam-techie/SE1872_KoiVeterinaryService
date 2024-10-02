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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đăng nhập thất bại');
    }

    return await response.json();
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw error;
  }
};