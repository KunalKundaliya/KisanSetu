import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import styles from './Marketplace.module.css';

const MySales = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Active');

  const sales = [
    {
      id: 1,
      crop: 'Gehun',
      detail: '10 Qtl • Lucknow Mandi',
      price: '₹2,520/q',
      status: 'Active',
      statusColor: 'var(--primary)',
      time: '2 days active'
    },
    {
      id: 2,
      crop: 'Dhaan',
      detail: '15 Qtl • Sitapur Mandi',
      price: '₹2,100/q',
      status: 'Negotiating',
      statusColor: 'var(--warning)',
      time: '4 days active'
    },
    {
      id: 3,
      crop: 'Sarson',
      detail: '5 Qtl • Hardoi Mandi',
      price: '₹5,400/q',
      status: 'Deal Done',
      statusColor: 'var(--text-secondary)',
      time: 'Ended today'
    }
  ];

  return (
    <div className={styles.container}>
      <TopAppBar 
        title="Meri Sales 📊" 
        rightAction={<Bell size={24} color="var(--text-primary)" />}
      />

      <div className={styles.content}>
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Kool Kamai</span>
            <span className={styles.statValueGreen}>₹1,24,500</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Chalu Listings</span>
            <span className={styles.statValue}>3 Active</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>12 Deals</span>
          </div>
        </div>

        <div className={styles.tabsRow}>
          {['Active', 'Completed', 'All'].map(tab => (
            <button 
              key={tab}
              className={`${styles.salesTab} ${activeTab === tab ? styles.salesTabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.salesList}>
          {sales.map(sale => (
            <div key={sale.id} className={styles.saleCard} onClick={() => navigate('/sales/1')}>
              <div className={styles.saleHeader}>
                <div className={styles.saleTitleGroup}>
                  <span className={styles.saleIcon}>🌾</span>
                  <div>
                    <h4 className={styles.saleCrop}>{sale.crop}</h4>
                    <p className={styles.saleDetail}>{sale.detail}</p>
                    <p className={styles.salePrice}>{sale.price}</p>
                  </div>
                </div>
                <div className={styles.saleStatusGroup}>
                  <span 
                    className={styles.saleStatusBadge}
                    style={{ color: sale.statusColor, backgroundColor: 'rgba(0,0,0,0.05)' }}
                  >
                    {sale.status}
                  </span>
                  <span className={styles.saleTime}>{sale.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySales;
