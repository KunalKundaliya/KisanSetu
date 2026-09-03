import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bell, ArrowRight, Check, Camera, Trash2, ShoppingBag, Store, MapPin, Loader2, Sparkles } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAuth } from '../../context/AuthContext';
import { createCropListing, getMandiPrices, getCropsMeta } from '../../services/api';
import styles from './Marketplace.module.css';

const SellCrop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { farmer } = useAuth();

  const urlCrop = searchParams.get('crop');
  const urlMandi = searchParams.get('mandi');
  const urlPrice = searchParams.get('price');

  const [cropsList, setCropsList] = useState([]);
  const [cropsLoading, setCropsLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(urlCrop || 'wheat');
  const [selectedGrade, setSelectedGrade] = useState('A');
  const [quantity, setQuantity] = useState('10');
  const [pricePerQuintal, setPricePerQuintal] = useState(urlPrice || '2480');
  const [mandiName, setMandiName] = useState(urlMandi || 'Central APMC Mandi');
  const [cropImage, setCropImage] = useState(null);
  const [cropImagePreview, setCropImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableMandis, setAvailableMandis] = useState([]);
  const [mandisLoading, setMandisLoading] = useState(false);

  // Fetch crops metadata dynamically from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setCropsLoading(true);
        const res = await getCropsMeta();
        if (res.data?.crops && Array.isArray(res.data.crops)) {
          setCropsList(res.data.crops);
        }
      } catch (err) {
        console.error('Failed to load crop metadata in SellCrop:', err);
      } finally {
        setCropsLoading(false);
      }
    };
    fetchCrops();
  }, []);

  // Sync state if URL query params change (e.g. redirected from Mandi Bhav)
  useEffect(() => {
    if (urlCrop) {
      setSelectedCrop(urlCrop);
    }
    if (urlMandi) {
      setMandiName(urlMandi);
    }
    if (urlPrice) {
      setPricePerQuintal(urlPrice);
    }
  }, [urlCrop, urlMandi, urlPrice]);

  // Fetch available mandis when selected crop changes
  useEffect(() => {
    const fetchMandisForCrop = async () => {
      try {
        setMandisLoading(true);
        const res = await getMandiPrices(selectedCrop);
        const rawList = res.data?.prices || res.data?.mandiPrices || [];
        const normalized = (rawList.length > 0 ? rawList : [
          { mandiName: 'Central APMC Mandi', distanceKm: 12, modalPrice: 2480, price: 2480, isBest: true },
          { mandiName: 'Krishi Upaj Mandi Samiti', distanceKm: 22, modalPrice: 2420, price: 2420, isBest: false },
          { mandiName: 'Regional Kisan Bazar', distanceKm: 8, modalPrice: 2390, price: 2390, isBest: false },
          { mandiName: 'District Krishi Mandi', distanceKm: 24, modalPrice: 2490, price: 2490, isBest: false },
        ]).map((item, idx) => ({
          ...item,
          modalPrice: item.modalPrice || item.price || 2200,
          mandiName: item.mandiName || item.market || item.name || `Mandi ${idx + 1}`,
          distanceKm: item.distanceKm || [8, 16, 24][idx] || 10,
        }));

        setAvailableMandis(normalized);

        // If no custom mandi was specifically passed in query params or we switched crops, sync price & mandi
        if (!urlMandi && normalized.length > 0) {
          const matchedMandi = normalized.find(m => m.mandiName.toLowerCase() === mandiName.toLowerCase());
          if (!matchedMandi) {
            setMandiName(normalized[0].mandiName);
            if (!urlPrice) {
              setPricePerQuintal(String(normalized[0].modalPrice));
            }
          }
        }
      } catch (err) {
        console.error('Failed to load mandis:', err);
        setAvailableMandis([
          { mandiName: 'Central APMC Mandi', distanceKm: 12, modalPrice: 2480, price: 2480, isBest: true },
          { mandiName: 'Krishi Upaj Mandi Samiti', distanceKm: 22, modalPrice: 2420, price: 2420, isBest: false },
          { mandiName: 'Regional Kisan Bazar', distanceKm: 8, modalPrice: 2390, price: 2390, isBest: false },
        ]);
      } finally {
        setMandisLoading(false);
      }
    };

    fetchMandisForCrop();
  }, [selectedCrop]);

  const handleCropSelect = (cropId) => {
    setSelectedCrop(cropId);
    setSearchParams({ crop: cropId }, { replace: true });
  };

  const handleMandiSelect = (mandiObj) => {
    setMandiName(mandiObj.mandiName);
    const price = mandiObj.modalPrice || mandiObj.price;
    if (price) {
      setPricePerQuintal(String(price));
    }
    setSearchParams({
      crop: selectedCrop,
      mandi: mandiObj.mandiName,
      price: String(price || pricePerQuintal),
    }, { replace: true });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCropImage(file);
      setCropImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setCropImage(null);
    setCropImagePreview(null);
  };

  const handleCreateListing = async () => {
    try {
      setLoading(true);
      await createCropListing({
        cropType: selectedCrop,
        quantity: Number(quantity),
        pricePerQuintal: Number(pricePerQuintal),
        expectedPrice: Number(pricePerQuintal),
        quality: selectedGrade,
        mandiName,
        district: farmer?.district || 'Hardoi',
        state: farmer?.state || 'Uttar Pradesh',
      });
      alert(`Fasal Listing (${selectedCropObj.name}) ${mandiName} ke liye publish ho gayi!`);
      navigate('/sales');
    } catch (err) {
      alert(err.response?.data?.message || 'Listing banane mein truti aayi.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCropObj = cropsList.find((c) => c.id === selectedCrop.toLowerCase()) || {
    id: selectedCrop,
    name: selectedCrop.toUpperCase(),
    emoji: '🌾',
  };

  return (
    <div className={styles.container} >
      <TopAppBar
        title="Fasal Becho 🛒"
        showBack={true}
        onBack={() => navigate('/home')}
      />

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <span className={styles.profileTitle}>Kisan Details (AgriStack)</span>
            <span className={styles.verifiedBadge}>Verified ✓</span>
          </div>
          <div className={styles.profileDetails}>
            <p><strong>Naam:</strong> {farmer?.name || 'Ramlal Ji'}</p>
            <p><strong>Location:</strong> {farmer?.district || 'Hardoi'}, {farmer?.state || 'UP'}</p>
            <p><strong>Kisan ID:</strong> {farmer?.kisanId || 'KISAN123456'}</p>
          </div>
        </div>

        {/* Kaun Si Fasal Bechni Hai */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Kaun si fasal bechni hai?</h3>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {
              cropsList.map((crop) => {
                const isActive = selectedCrop.toLowerCase() === crop.id.toLowerCase();
                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => handleCropSelect(crop.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                      backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: isActive ? 'var(--primary-dark)' : 'var(--text-primary)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? '0 2px 8px rgba(34, 197, 94, 0.2)' : 'none'
                    }}
                  >
                    <span>{crop.emoji}</span>
                    <span>{crop.name}</span>
                  </button>
                );
              })
            }
          </div>
        </div>

        {/* Mandi Selection / Opt Through Mandis */}
        <div className={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 className={styles.sectionTitle} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Store size={18} color="var(--primary)" /> Mandi Chunein (Select Target Mandi)
            </h3>
            <button
              type="button"
              onClick={() => navigate(`/mandi-bhav?crop=${selectedCrop}`)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Rate Compare Karein 📊
            </button>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Aapki fasal ke liye aas-paas ki Mandiyan — Kisi bhi Mandi par tap karein:
          </p>

          {mandisLoading ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>
              <Loader2 size={20} className="animate-spin" style={{ margin: '0 auto 6px', color: 'var(--primary)' }} />
              <span style={{ fontSize: '12px' }}>Mandiyan load ho rahi hain...</span>
            </div>
          ) : (
            <div className={styles.mandiOptionsContainer}>
              {availableMandis.map((mandi, idx) => {
                const isSelected = mandiName.trim().toLowerCase() === mandi.mandiName.trim().toLowerCase();
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.mandiOptionCard} ${isSelected ? styles.mandiOptionCardActive : ''}`}
                    onClick={() => handleMandiSelect(mandi)}
                  >
                    <div className={styles.mandiOptionLeft}>
                      <div className={`${styles.mandiOptionRadio} ${isSelected ? styles.mandiOptionRadioActive : ''}`}>
                        {isSelected && <Check size={12} color="#fff" />}
                      </div>
                      <div>
                        <span className={styles.mandiOptionTitle}>
                          {mandi.mandiName} {mandi.isBest && '🌟 (Best Deal)'}
                        </span>
                        <span className={styles.mandiOptionSub}>
                          <MapPin size={11} style={{ display: 'inline', marginRight: '2px', verticalAlign: '-1px' }} />
                          {mandi.distanceKm} km door
                        </span>
                      </div>
                    </div>
                    <div className={styles.mandiOptionRight}>
                      <span className={styles.mandiOptionPrice}>₹{mandi.modalPrice || mandi.price}</span>
                      <span className={styles.mandiOptionUnit}>/quintal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: '12px' }}>
            <Input
              label="Selected Target Mandi (ya Custom Mandi Likhein)"
              value={mandiName}
              onChange={(e) => setMandiName(e.target.value)}
              placeholder="Jaise: Central APMC Mandi, Kanpur Mandi..."
            />
          </div>
        </div>

        {/* Fasal Upload Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Fasal Ki Photo Upload Karein 📸</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Apni kheti ya fasal ki photo daalein taaki vyapari (buyers) achhe daam laga sakein.
          </p>

          {cropImagePreview ? (
            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <img src={cropImagePreview} alt="Fasal Preview" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <button
                onClick={removeImage}
                style={{
                  position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ef4444',
                  color: '#fff', padding: '6px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '24px', border: '2px dashed var(--primary)', borderRadius: '12px', backgroundColor: 'var(--secondary)',
              cursor: 'pointer', textAlign: 'center', gap: '8px'
            }}>
              <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '50%' }}>
                <Camera size={28} color="var(--primary)" />
              </div>
              <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)' }}>
                Fasal Ki Photo Khinchein ya Upload Karein
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                JPEG, PNG format (Max 5MB)
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Fasal Details & Daam</h3>
          <Input
            label="Kitna maal hai? (quintal mein)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />

          <Input
            label="Mandi Daam / Price (₹ per quintal)"
            value={pricePerQuintal}
            onChange={(e) => setPricePerQuintal(e.target.value)}
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

          {/* Inline Action Submit Button inside Form */}
          <div style={{ marginTop: '28px' }}>
            <Button fullWidth onClick={handleCreateListing} disabled={loading} style={{ padding: '14px', fontSize: '15px' }}>
              {loading ? 'Fasal List Ho Rahi Hai...' : <>Fasal {mandiName} Mein List Karein <ShoppingBag size={20} /></>}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar Above Navigation Bar */}
      <div className={styles.fixedBottom} style={{ display: 'flex', gap: '8px' }} >
        <Button fullWidth onClick={() => navigate(`/mandi-bhav?crop=${selectedCrop}`)} variant="outline">
          Rate Dekho 📊
        </Button>
        <Button fullWidth onClick={handleCreateListing} disabled={loading}>
          {loading ? 'Listing...' : <>Becho <Check size={20} /></>}
        </Button>
      </div >
    </div >
  );
};

export default SellCrop;
