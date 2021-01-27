import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001';

export async function createUser(xtzAddress) {
  console.log('Running createUser.', xtzAddress);
  try {
    const res = await axios.post(`${API_URL}/user`, { xtzAddress });
    if (res.statusText !== 'OK') throw new Error();
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function updateUser(email, name, user) {
  console.log('Running updateUser.');
  try {
    const res = await axios.patch(`${API_URL}/user`, { user, email, name });
    console.log('Returning data');
    return res.data;
  } catch (err) {
    console.log('Running catch');
    return res.data;
  }
}

export async function verifyUser(token) {
  try {
    const res = await axios.post(`${API_URL}/user/verify`, { token });
    if (res.statusText !== 'OK') throw new Error();

    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
}
