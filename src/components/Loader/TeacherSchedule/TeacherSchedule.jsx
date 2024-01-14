import './TeacherSchedule.scss';
import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const TeacherSchedule = () => {
    return (
        <div className='sceleton-schedule-widget'>
            <div className="sceleton-schedule-widget-header">
                <p className="block-widget__title text-s font-b">Расписание на</p>
                <Skeleton variant="rectangular" animation="wave" width={85} height={38} />
                <Skeleton variant="rectangular" animation="wave" width={85} height={38} />
            </div>
            <div className="sceleton-schedule-widget-main">
                <Skeleton variant="rounded" animation="wave" width={210} height={30} />
                <Skeleton variant="rounded" animation="wave" width={210} height={30} />
                <Skeleton variant="rounded" animation="wave" width={210} height={30} />
                <Skeleton variant="rounded" animation="wave" width={210} height={30} />
                <Skeleton variant="rounded" animation="wave" width={210} height={30} />
            </div>
        </div>
    )
}

export default TeacherSchedule