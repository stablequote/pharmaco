import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupplierCard from './SupplierCard';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5005/supplier/list')
      .then((res) => setSuppliers(res.data.supplier))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid>
      {suppliers.map((supplier) => (
        <Grid.Col span={4} key={supplier._id}>
          <SupplierCard supplier={supplier} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default SuppliersList;
