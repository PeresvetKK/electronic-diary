import React from 'react';
import s from './Table.module.scss';
import Ocenka from '../widgets/Lessons/Ocenka/Ocenka';

const Table = () => {
  return (
    <div className={s['journal-item']}>
        <div className={`${s['table-date']}`}>
            <h2>Понедельник <span>22.05</span></h2>
        </div>
        <div class={s.table}>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>№</div>
                <div className={`${s.cell} ${s.predmet}`}>Предмет</div>
                <div class={`${s.cell} ${s.houmwork}`}>Домашнее задание</div>
                <div class={`${s.cell} ${s.score}`}>Оценка</div>
                <div class={`${s.cell} ${s.comment}`}>Комментарий</div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>1</div>
                <div className={`${s.cell} ${s.predmet}`}>Математика</div>
                <div class={`${s.cell} ${s.houmwork}`}>П.1 № 24,26,30 а,в,</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div><div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>2</div>
                <div className={`${s.cell} ${s.predmet}`}>Русский язык</div>
                <div class={`${s.cell} ${s.houmwork}`}>Индивидуальные задания</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}>Активно работал в классе</div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>3</div>
                <div className={`${s.cell} ${s.predmet}`}>Математика</div>
                <div class={`${s.cell} ${s.houmwork}`}>П.1 № 24,26,30 а,в,</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div><div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>4</div>
                <div className={`${s.cell} ${s.predmet}`}>Русский язык</div>
                <div class={`${s.cell} ${s.houmwork}`}>Индивидуальные задания</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}>Активно работал в классе</div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>5</div>
                <div className={`${s.cell} ${s.predmet}`}>Математика</div>
                <div class={`${s.cell} ${s.houmwork}`}>П.1 № 24,26,30 а,в,</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>6</div>
                <div className={`${s.cell} ${s.predmet}`}>Математика</div>
                <div class={`${s.cell} ${s.houmwork}`}>П.1 № 24,26,30 а,в,</div>
                <div class={`${s.cell} ${s.score}`}><Ocenka ocenka={5}></Ocenka></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>7</div>
                <div className={`${s.cell} ${s.predmet}`}></div>
                <div class={`${s.cell} ${s.houmwork}`}></div>
                <div class={`${s.cell} ${s.score}`}></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>8</div>
                <div className={`${s.cell} ${s.predmet}`}></div>
                <div class={`${s.cell} ${s.houmwork}`}></div>
                <div class={`${s.cell} ${s.score}`}></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div>
            <div class={s.row}>
                <div className={`${s.cell} ${s.number}`}>9</div>
                <div className={`${s.cell} ${s.predmet}`}></div>
                <div class={`${s.cell} ${s.houmwork}`}></div>
                <div class={`${s.cell} ${s.score}`}></div>
                <div class={`${s.cell} ${s.comment}`}></div>
            </div>
        </div>
    </div>
  )
}

export default Table