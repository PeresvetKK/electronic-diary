import React, {useState, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../Loyout/Loyout';
import s from './SideBar.module.scss';
import {BurgerSVG, NewsSVG, JournalSVG, HomeSVG} from '../../resources/svg';

const SideBar = ({children, ...props }) => {
	// содержит информацию о юзере
	const userData = useContext(UserContext)
	// открытие и закрытие бокового меню
	const [open, setOpen] = useState(true)
	
	return (
		<aside className={`${s.aside} ${open ? s.aside__open : s.aside__close} `}>
			<div className={s.aside__header}>
				<NavLink to={'/'} className={s.logo}>РЭД</NavLink>
				<div className={s.burger} onClick={() => setOpen(!open)}>
					<BurgerSVG/>
				</div>
			</div>
			<nav className={s.nav}>
				<div className={s.nav__items}>
						<div className={s.nav__item}>
							<NavLink to='/' className={s.nav__link}>
								<HomeSVG/>
								<p className={s.nav__text}>Домой</p>
							</NavLink>
						</div>
						<div className={s.nav__item}>
							{userData.role == 'Ученик'
								?<NavLink to={'/journal'} className={s.nav__link}>
									<JournalSVG/>
									<p className={s.nav__text}>Мой дневник</p>
								</NavLink>
								
								:<NavLink to={'/journal'} className={s.nav__link}>
									<JournalSVG/>
									<p className={s.nav__text}>Расписание</p>
								</NavLink>
							}
						</div>
						<div className={s.nav__item}>
							<NavLink to='/news' className={s.nav__link}>
								<NewsSVG/>
								<p className={s.nav__text}>Новости</p>
							</NavLink>
						</div>
				</div>
			</nav>
		</aside>
	
	)}

export default SideBar