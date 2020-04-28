import { useEffect } from 'react';
import { navigate } from 'gatsby';

//redirect homepage view to /tezos
const HomePage = () => {
  useEffect(() => {
    navigate('/tezos');
  });
  return '';
};

export default HomePage;
