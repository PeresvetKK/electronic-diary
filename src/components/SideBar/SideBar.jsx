import React from 'react'
import classes from './SideBar.scss';

const SideBar = () => {
	return (
		<aside className='aside'>
			<a href='/' className="aside__logo">
				ЭЖШ
			</a>
			<nav className="nav">
				<div className="nav__items">
					<div className="nav__item">
						<a href="" className="nav__link">
							Мой дневник
						</a>
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
				</div>
			</nav>
		</aside>
	)
}

export default SideBar