import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import Button from '../../components/Button/Button';
import styles from './Schemes.module.css';

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for details based on ID
  const scheme = {
    title: 'Pradhan Mantri Kisan Samman Nidhi',
    subtitle: 'Sarkari Scheme • Govt of India',
    statusText: 'Aap Eligible Ho! ✓',
    benefits: [
      '₹6,000 per year sidhe bank account mein.',
      '₹2,000 ki teen aasan kist (installments).'
    ],
    eligibility: [
      'Apni zameen ka bigha match hai',
      'Aadhaar Verified hai',
      'Uttar Pradesh Nivasi hai'
    ]
  };

  return (
    <div className={styles.detailsContainer}>
      <TopAppBar showBack={true} />
      
      <div className={styles.detailsContent}>
        <div className={styles.headerSection}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderCard}></div>
          </div>
          <h1 className={styles.detailsTitle}>{scheme.title}</h1>
          <p className={styles.detailsSubtitle}>{scheme.subtitle}</p>
          
          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Sthiti (Status):</span>
            <span className={styles.statusBadge}>{scheme.statusText}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionHeading}>Fayde (Benefits) 💰</h2>
          <ul className={styles.bulletList}>
            {scheme.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionHeading}>Kriteriya (Eligibility) ✓</h2>
          <ul className={styles.checkList}>
            {scheme.eligibility.map((item, i) => (
              <li key={i}>
                <Check size={16} color="var(--primary)" className={styles.checkIcon} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.fixedBottom}>
        <Button fullWidth onClick={() => navigate('/schemes/apply')}>
          Abhi Apply Karo <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SchemeDetails;
