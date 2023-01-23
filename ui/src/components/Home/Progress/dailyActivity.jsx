import React from "react";
import {CChart} from '@coreui/react-chartjs';

function DailyAct(){

    return(
        <div>
            <CChart
                type="bar"
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                    {
                        label: 'GitHub Commits',
                        backgroundColor: '#1565C0',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                    ],
                }}
                labels="months"
                />
        </div>

    )
}

export default DailyAct;