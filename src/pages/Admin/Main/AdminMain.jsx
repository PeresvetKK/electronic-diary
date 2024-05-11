import React from 'react';
import './AdminMain.scss';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import { Link } from 'react-router-dom';
import Plitca from '../../../components/UI/plitca/Plitca';

const AdminMain = () => {

  return (
    <WhiteBox>
        <PageTitle>Панель администратора</PageTitle>
        <div className="admin-main-list">
          <Link state={{ }} to={`/admin/auth/register`}>
            <Plitca>Добавить пользователя</Plitca>
          </Link>
          <Link state={{ }} to={`/admin/clases/create`}>
            <Plitca>Добавить класс</Plitca>
          </Link>
          <Link state={{ }} to={`/admin/auth/register`}>
            <Plitca>Все классы</Plitca>
          </Link>
        </div>
    </WhiteBox>
  )
}


export default AdminMain