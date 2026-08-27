import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import styles from './Schemes.module.css';

const SchemesList = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const schemes = [
    {
      id: 'pm-kisan',
      title: 'PM-KISAN',
      desc: 'Pradhan Mantri Kisan Samman Nidhi',
      highlight: '₹6,000 / saal',
      tag: 'Eligible ✓',
      tagType: 'success'
    },
    {
      id: 'pmfby',
      title: 'PMFBY',
      desc: 'Pradhan Mantri Fasal Bima Yojana',
      highlight: 'Kharif & Rabi Bima',
      tag: 'Check Karo',
      tagType: 'warning'
    },
    {
      id: 'kcc',
      title: 'Kisan Credit Card (KCC)',
      desc: 'Sasti Dar Par Krishi Loan',
      highlight: '₹3 Lakh tak limit',
      tag: 'Eligible ✓',
      tagType: 'success'
    },
    {
      id: 'soil-health',
      title: 'Soil Health Card',
      desc: 'Zameen Ki Jaanch Patrika',
      highlight: 'Mitti jaanch free',
      tag: 'Aavedan karein',
      tagType: 'warning'
    }
  ];

  return (
    <div className={styles.container}>
      <TopAppBar title="Sarkari Yojnayein 📋" />
      
      <div className={styles.tabsContainer}>
        <div className={styles.tabsScroll}>
          <button 
            className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Sabhi (All)
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'eligible' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('eligible')}
          >
            Eligible ✓
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'loan' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('loan')}
          >
            Loan
          </button>
        </div>
      </div>

      <div className={styles.listContainer}>
        {schemes.map(scheme => (
          <div 
            key={scheme.id} 
            className={styles.schemeCard}
            onClick={() => navigate(`/schemes/${scheme.id}`)}
          >
            <div className={styles.cardIcon}>
              <FileText size={24} color="var(--primary)" />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{scheme.title}</h3>
              <p className={styles.cardDesc}>{scheme.desc}</p>
              <p className={styles.cardHighlight}>{scheme.highlight}</p>
            </div>
            <div className={styles.cardRight}>
              <span className={`${styles.tag} ${styles[`tag-${scheme.tagType}`]}`}>
                {scheme.tag}
              </span>
              <ChevronRight size={20} color="var(--text-tertiary)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemesList;
