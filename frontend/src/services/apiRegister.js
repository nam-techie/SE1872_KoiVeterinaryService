// File này chứa các hàm gọi API
export const register = async (username, email, password) => {
    try {
      const response = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Đăng ký thất bại');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      throw error; 
    }
  };  