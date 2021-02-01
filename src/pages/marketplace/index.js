import React from 'react';
import Button from '../../components/Buttons';

const Marketplace = () => {
  return (
    <div>
      <Button size="sm" type="primary" disabled="true">
        Primary Small
      </Button>
      <br/>
      <Button size="lg" type="primary">
        Primary Small
      </Button>
      <br/>
      <Button size="sm" type="secondary" >
        Secondary Small
      </Button>
    </div>
  );
};

export default Marketplace;
