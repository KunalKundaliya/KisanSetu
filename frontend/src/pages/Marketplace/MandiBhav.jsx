import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import Button from '../../components/Button/Button';
import styles from './Marketplace.module.css';

const MandiBhav = () => {
  const navigate = useNavigate();

  const rates = [
    { name: 'Lucknow Mandi', distance: '12 km', price: '₹2,520', trend: 'up', isBest: true },
    { name: 'Sitapur Mandi', distance: '24 km', price: '₹2,490', trend: 'down', isBest: false },
    { name: 'Hardoi Mandi', distance: '8 km', price: '₹2,450', trend: 'up', isBest: false },
    { name: 'Kanpur Mandi', distance: '85 km', price: '₹2,380', trend: 'down', isBest: false },
  ];

  return (
    <div className={styles.container}>
      <TopAppBar title="Mandi Bhav Comparison 📊" showBack={true} />
      
      <div className={styles.content}>
        <div className={styles.maalDetail}>
          <span className={styles.maalLabel}>Maal Detail:</span>
          <span className={styles.maalValue}>Gehun — 10 Quintal (A Grade)</span>
        </div>

        <h3 className={styles.sectionTitle}>Aapke Aas-Paas Ki Mandi Rate</h3>
        
        <div className={styles.rateList}>
          {rates.map((rate, i) => (
            <div key={i} className={`${styles.rateCard} ${rate.isBest ? styles.rateCardBest : ''}`}>
              {rate.isBest && (
                <div className={styles.bestDealBadge}>
                  ⭐ Best Deal! {rate.name} — {rate.price}/quintal
                </div>
              )}
              <div className={styles.rateContent}>
                <div className={styles.rateLeft}>
                  <h4 className={styles.mandiName}>{rate.name} 🏢</h4>
                  <p className={styles.mandiDistance}>🚗 {rate.distance}</p>
                </div>
                <div className={styles.rateRight}>
                  <span className={styles.price}>{rate.price}</span>
                  {rate.trend === 'up' ? 
                    <ArrowUp size={20} className={styles.trendUp} /> : 
                    <ArrowDown size={20} className={styles.trendDown} />
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fixedBottom}>
        <Button fullWidth onClick={() => navigate('/sell/create')}>
          Is Mandi Mein Becho →
        </Button>
      </div>
    </div>
  );
};

export default MandiBhav;
