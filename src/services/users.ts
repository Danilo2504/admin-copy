import admin from '../config/axiosConfig';
import { getSession } from 'next-auth/react';

interface SessionProps {
  user: {
    email: string;
    id: string;
    token: string;
    role: string;
    [props: string]: any;
  }
}

export const getUsersStats = async () => {
  try {
    const session: SessionProps = await getSession() as any;
    const { data } = await admin.get('/getUsersStats', {
      headers: { Authorization: `Bearer ${session.user.token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const getAllUsers = async (search?: string) => {
  try {
    const session: SessionProps = await getSession() as any;
    const { data } = await admin.get('/users', {
      headers: { Authorization: `Bearer ${session.user.token}` },
      params: {
        search,
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUsersByCountry = async () => {
  try {
    const session: SessionProps = await getSession() as any;
    const { data } = await admin.get('/getUsersAmountCountry', {
      headers: { Authorization: `Bearer ${session.user.token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const getNewUsersStats = async (period: string) => {
  try {
    const session: SessionProps = await getSession() as any;
    const { data } = await admin.get('/getNewUsersStats', {
      headers: { Authorization: `Bearer ${session.user.token}` },
      params: {
        unitOfTime: period
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const getUserById = async (userId: string) => {
  try {
    const session: SessionProps = await getSession() as any;
    const { data } = await admin.get(`/getUserById/${userId}`, {
      headers: { Authorization: `Bearer ${session.user.token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}