import React from 'react';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx';
import ProfileContent from '../components/Profile/ProfileContent.jsx';
import { useSearchParams } from 'react-router-dom';

const ProfilePage = () => {
  const [queryString] = useSearchParams();
  const [active, setActive] = React.useState(queryString.get('inbox') ? 4 : 1);

  return (
    <div>
      <Header />
      <div className="absolute top-[60px] w-full 800px:top-[160px]">
        <div className={`${styles.section} flex bg-[#f5f5f5] mt-5 `}>
          <div className="w-[50px] 800px:w-[340px] mt-10 800px:mt-0">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
