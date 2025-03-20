import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupplierCard from './SupplierCard';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_URL

  useEffect(() => {
    axios.get(`${BASE_URL}/supplier/list`)
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
