import React, { useState } from 'react';
import { Mic, Phone } from 'lucide-react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import styles from './Chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'user', text: 'PM-KISAN ki kist kab aayegi?' },
    { id: 2, type: 'user', text: 'Gehun mein keet ka kya upaay hai?' },
    { id: 3, type: 'user', text: 'KCC loan kaise milega?' },
    { id: 4, type: 'user', text: 'Mera Gehun pichle hafte se peela pad raha hai. Kya karun?', active: true },
    { 
      id: 5, 
      type: 'ai', 
      isCard: true,
      cardTitle: 'KISAN SETU KA SUJHAAV',
      question: 'Jawaab (Answer)',
      answer: 'Yeh Nitrogen ki kami ya Paani ka rukav ho sakta hai.',
      detailLabel: 'Detail (Remedy)',
      detail: 'Ek bigha mein lagbhag 15kg Urea ka chhidkaav karein. Sinchai ke waqt paani ko khada na rehne dein.',
      source: 'Krishi Vibhag',
      actionText: 'Krishi Officer Se Baat Karo'
    }
  ]);
  const [input, setInput] = useState('');

  const OnlineStatus = () => (
    <div className={styles.onlineStatus}>
      <span className={styles.dot}></span>
      <span>Online</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <TopAppBar 
        title={<><span style={{fontSize: '20px'}}>🤖</span> AI Saathi</>}
        showBack={true}
        rightAction={<OnlineStatus />}
      />

      <div className={styles.chatArea}>
        {messages.map((msg) => (
          msg.type === 'user' ? (
            <div key={msg.id} className={`${styles.messageWrapper} ${styles.userWrapper}`}>
              <div className={`${styles.bubble} ${styles.userBubble} ${msg.active ? styles.activeUserBubble : ''}`}>
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
              {msg.isCard && (
                <div className={styles.suggestionCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.robotIcon}>🤖</span>
                    <span className={styles.cardTitleText}>{msg.cardTitle}</span>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <p className={styles.infoLabel}>{msg.question}</p>
                    <p className={styles.infoTextMain}>{msg.answer}</p>
                    
                    <p className={styles.infoLabel}>{msg.detailLabel}</p>
                    <p className={styles.infoText}>{msg.detail}</p>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.sourceText}>Source: {msg.source}</span>
                    <button className={styles.actionBtn}>
                      <Phone size={14} />
                      {msg.actionText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        ))}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder="Type karein ya bolkar pucho..." 
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles.micBtn}>
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
