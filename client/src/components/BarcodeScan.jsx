import { Scanner } from '@yudiel/react-qr-scanner';

const BarcodeScan = () => {
    return <Scanner onScan={(result) => console.log(result)} />;
};

export default BarcodeScan;