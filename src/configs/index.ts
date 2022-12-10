const API_KEY = 'https://gorest.co.in/public/v1';
export const GET_DATA = async ({path}: any) => {
  try {
    const data = await fetch(`${API_KEY}/${path}`, {
      method: 'GET',
    });
    const result = data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
