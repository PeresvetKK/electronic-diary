import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classes from './Grade.scss';
ChartJS.register(ArcElement, Tooltip, Legend);


const Grade = ({gradeData, ...props}) => {
    const options = {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 10,
                }
            }
        },
    }
    const labels = ['5', '4', '3', '2'];

    const data = {
        labels: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Неуд'],
        datasets: [
            {
                label: 'Количество',
                data: gradeData,
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0,
            },
        ],
    };
    return (
        <div className="grade-diagrams">
            <h3 className='grade-diagrams__title'>Успеваемость</h3>
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default Grade