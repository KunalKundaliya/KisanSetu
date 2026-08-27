import { useState } from 'react';
import { Bell, Moon, Pencil, Sun } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [draftUser, setDraftUser] = useState(user);
  const initials = user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  const handleChange = (event) => {
    setDraftUser({ ...draftUser, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setUser(draftUser);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <TopAppBar
        title="Meri Profile 👤"
        rightAction={(
          <>
            <button className={styles.iconButton} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Bell size={24} color="var(--text-primary)" />
          </>
        )}
      />

      <div className={styles.content}>
        <div className={styles.headerCard}>
          <div className={styles.avatarLarge}>
            <span className={styles.avatarInitials}>{initials}</span>
            <div className={styles.verifiedIcon}>✓</div>
          </div>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userType}>Verified Kisan ✓</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Verified Details</h3>
          <div className={styles.detailsCard}>
            <div className={styles.detailItem}>
              <div className={styles.detailLeft}>
                <p className={styles.detailLabel}>Gaon / Zila</p>
                <p className={styles.detailValue}>{user.location || 'Not added'}</p>
              </div>
              <span className={styles.statusVerified}>Saved</span>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLeft}>
                <p className={styles.detailLabel}>Zameen Details</p>
                <p className={styles.detailValue}>{user.landSize ? `${user.landSize} Bigha` : 'Not added'}</p>
              </div>
              <span className={styles.statusVerified}>Verified ✓</span>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLeft}>
                <p className={styles.detailLabel}>Sinchai ka Sadhan</p>
                <p className={styles.detailValue}>{user.irrigation || 'Not added'}</p>
              </div>
              <span className={styles.statusVerified}>Verified ✓</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Aapki Details</h3>
          <div className={styles.detailsCard}>
            <div className={styles.simpleDetailItem}>
              <p className={styles.detailLabel}>Main Fasal</p>
              <p className={styles.detailValue}>{user.mainCrop}</p>
            </div>
            <div className={styles.simpleDetailItem}>
              <p className={styles.detailLabel}>Mobile Number</p>
              <p className={styles.detailValue}>{user.mobile || 'Not added'}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className={styles.editCard}>
            <Input label="Naam" name="name" value={draftUser.name} onChange={handleChange} />
            <Input label="Gaon / Zila" name="location" value={draftUser.location} onChange={handleChange} />
            <Input label="Zameen (Bigha)" name="landSize" type="number" value={draftUser.landSize} onChange={handleChange} />
            <Input label="Sinchai" name="irrigation" value={draftUser.irrigation} onChange={handleChange} />
            <Input label="Mobile Number" name="mobile" value={draftUser.mobile} onChange={handleChange} />
          </div>
        )}

        <div className={styles.actions}>
          <Button fullWidth onClick={isEditing ? handleSave : () => { setDraftUser(user); setIsEditing(true); }}>
            {isEditing ? 'Details Save Karo' : 'Profile Edit Karo'} <Pencil size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
