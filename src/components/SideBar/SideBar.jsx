import React, {useState} from 'react'
import { NavLink} from 'react-router-dom'
import s from './SideBar.module.scss';
import {BurgerSVG, NewsSVG, JournalSVG, HomeSVG} from '../../resources/svg';

const SideBar = ({role, children, ...props }) => {
	const [open, setOpen] = useState(true)

	const getNavLinkWithRole = (role) =>{
		switch(role){
			case 'Учитель':
				return [
					{
						path: '/',
						text: 'Главная',
						icon: <HomeSVG/>,
					},
					{
						path: '/journal',
						text: 'Журнал',
						icon: <JournalSVG/>,
					},
					{
						path: '/news',
						text: 'Новости',
						icon: <NewsSVG/>,
					},
				]
				break;
			case 'Ученик':
				return [
					{
						path: '/',
						text: 'Главная',
						icon: <HomeSVG/>,
					},
					{
						path: '/journal',
						text: 'Мой дневник',
						icon: <JournalSVG/>,
					},
					{
						path: '/news',
						text: 'Новости',
						icon: <NewsSVG/>,
					},
				]
				break;
		}
	}
	const linksArray = getNavLinkWithRole(role);
	
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
					{linksArray.map((item, index) => (
						<div className={s.nav__item} key={index}>
							<NavLink to={item.path} className={s.nav__link}>
								{item.icon}
								<p className={s.nav__text}>{item.text}</p>
							</NavLink>
						</div>
					))}
				</div>
			</nav>
		</aside>
	
	)}

export default SideBar