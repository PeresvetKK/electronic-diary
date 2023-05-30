import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import classes from './SideBar.scss';

const SideBar = () => {
	const location = useLocation();

	useEffect(() => {
		console.log('Current location is ', location);
	  }, [location]);

	return (
		<aside className='aside'>
			<NavLink to={`/`} className="aside__logo">ЭЖШ</NavLink>
			<nav className="nav">
				<div className="nav__items">
					<div className="nav__item">
						<NavLink to={`/journal`} className="nav__link">Мой дневник</NavLink>
					</div>
					<div className="nav__item">
						<a href="" className="nav__link">
							Журнал оценок
						</a>
					</div>
					<div className="nav__item">
						<a href="" className="nav__link">
							Мои кружки
						</a>
					</div>
					<div className="nav__item">
						<NavLink to={`/news`} className="nav__link">Новости</NavLink>
					</div>
				</div>
			</nav>
		</aside>
	)
}

export default SideBar