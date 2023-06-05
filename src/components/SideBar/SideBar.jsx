import React, {useState} from 'react'
import { NavLink} from 'react-router-dom'
import s from './SideBar.module.scss';
import {BurgerSVG, NewsSVG, JournalSVG, HomeSVG} from '../../resources/svg';

const SideBar = () => {
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
						<NavLink to={`/`} className={s.nav__link}>
							<HomeSVG />
							<p className={s.nav__text}>Главная</p>
						</NavLink>
					</div>
					<div className={s.nav__item}>
						<NavLink to={`/journal`} className={s.nav__link}>
							<JournalSVG />
							<p className={s.nav__text}>Мой дневник</p>
						</NavLink>
					</div>
					<div className={s.nav__item}>
						<NavLink to={`/news`} className={s.nav__link}>
							<NewsSVG />
							<p className={s.nav__text}>Новости</p>
						</NavLink>
					</div>
				</div>
			</nav>
		</aside>
	
	)}

export default SideBar