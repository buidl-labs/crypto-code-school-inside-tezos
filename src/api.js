import axios from 'axios';

// const API_URL = 'https://cryptoverse-wars-backend-nfjp.onrender.com';
const API_URL = 'https://cryptoverse-wars-backend-pr-2.onrender.com';

export async function createUser(xtzAddress) {
  console.log('Running createUser.', xtzAddress);
  try {
    const res = await axios.post(`${API_URL}/user`, { xtzAddress });
    console.log(res);
    if (res.status !== 200) throw new Error();
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
    console.log(res);
    if (res.status !== 200) throw new Error();

    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateProgress(user, chapter_num, module_num) {
  try {
    const res = await axios.post(`${API_URL}/user/progress`, {
      user,
      chapter_num,
      module_num,
    });
    console.log(res);
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function batchUpdateProgress(user, progress) {
  try {
    const res = await axios.post(`${API_URL}/user/progress/batch`, {
      user,
      progress,
    });
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
}
