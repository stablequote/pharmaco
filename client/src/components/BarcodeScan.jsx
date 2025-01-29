import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

const BarcodeScan = () => {

    const [tracker, setTracker] = useState('centerText');

    function getTracker() {
        switch (tracker) {
            case 'outline':
                return outline;
            case 'boundingBox':
                return boundingBox;
            case 'centerText':
                return tracker;
            default:
                return undefined;
        }
    }

    return <Scanner 
                onScan={(result) => console.log(result)}
                formats={[
                    'qr_code',
                    'micro_qr_code',
                    'rm_qr_code',
                    'maxi_code',
                    'pdf417',
                    'aztec',
                    'data_matrix',
                    'matrix_codes',
                    'dx_film_edge',
                    'databar',
                    'databar_expanded',
                    'codabar',
                    'code_39',
                    'code_93',
                    'code_128',
                    'ean_8',
                    'ean_13',
                    'itf',
                    'linear_codes',
                    'upc_a',
                    'upc_e'
                ]}
                components={{
                    audio: true,
                    audio: true,
                    onOff: true,
                    torch: true,
                    zoom: true,
                    finder: true,
                    tracker: getTracker()
                }} />;
};

export default BarcodeScan;