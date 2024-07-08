import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      token = token.replace(/^"(.*)"$/, '$1');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        localStorage.clear();
        router.push('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return logout;
};
