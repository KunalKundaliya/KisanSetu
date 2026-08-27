import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Marketplace.module.css';

const SellCrop = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedCrop, setSelectedCrop] = useState('Gehun');
  const [selectedGrade, setSelectedGrade] = useState('A');
  const [quantity, setQuantity] = useState('10');

  const crops = [
    { id: 'Gehun', name: 'Gehun', emoji: '🌾' },
    { id: 'Dhaan', name: 'Dhaan', emoji: '🌾' },
    { id: 'Makka', name: 'Makka', emoji: '🌽' },
    { id: 'Sarson', name: 'Sarson', emoji: '🌼' },
    { id: 'Aloo', name: 'Aloo', emoji: '🥔' },
  ];

  return (
    <div className={styles.container}>
      <TopAppBar
        title="Fasal Becho 🛒"
        rightAction={<Bell size={24} color="var(--text-primary)" />}
      />

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <span className={styles.profileTitle}>Farmer Profile Details</span>
            <span className={styles.verifiedBadge}>Verified ✓</span>
          </div>
          <div className={styles.profileDetails}>
            <p><strong>Naam:</strong> {user.name}</p>
            <p><strong>Location:</strong> {user.location || 'Not added'}</p>
            <p><strong>Zameen Size:</strong> {user.landSize ? `${user.landSize} Bigha` : 'Not added'}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Kaun si fasal bechni hai?</h3>
          <div className={styles.chipGroup}>
            {crops.map(crop => (
              <button
                key={crop.id}
                className={`${styles.chip} ${selectedCrop === crop.id ? styles.chipActive : ''}`}
                onClick={() => setSelectedCrop(crop.id)}
              >
                {crop.name} {crop.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Selected Crop Specs</h3>
          <Input
            label="Kitna maal hai? (quintal mein)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />

          <div className={styles.gradeSection}>
            <label className={styles.gradeLabel}>Quality Grade kya hai?</label>
            <div className={styles.gradeGroup}>
              {['A', 'B', 'C'].map(grade => (
                <button
                  key={grade}
                  className={`${styles.gradeBtn} ${selectedGrade === grade ? styles.gradeActive : ''}`}
                  onClick={() => setSelectedGrade(grade)}
                >
                  {grade} Grade
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fixedBottom}>
        <Button fullWidth onClick={() => navigate('/mandi-bhav')}>
          Mandi Bhav Dekho <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SellCrop;
