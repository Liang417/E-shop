import React from 'react';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx';
import ProfileContent from '../components/Profile/ProfileContent.jsx';

const ProfilePage = () => {
  const [active, setActive] = React.useState(1);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[340px] mt-[20%] 800px:mt-0">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
