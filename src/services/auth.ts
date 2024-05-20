import admin from '../config/axiosConfig';

export const signIn = async (body: any) => {
  try {
    const { data } = await admin.post('/adminSignIn', body);
    return data;
  } catch (error) {
    throw error;
  }
};

