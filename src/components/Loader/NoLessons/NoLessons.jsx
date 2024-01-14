import './NoLessons.scss';
import {PartySVG} from '../../../resources/svg';

const NoLessons = ({title}) => {
  return (
    <div className='no-lessons'>
        <PartySVG/>
        <p className="no-lessons__title">На {title} уроков нет!</p>
    </div>
  )
}

export default NoLessons