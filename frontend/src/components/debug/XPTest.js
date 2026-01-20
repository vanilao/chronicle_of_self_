import React from 'react';
import { useXPWithSound } from '../../hooks/useXPWithSound';
import { useAuth } from '../../contexts/AuthContext';

const XPTest = () => {
  const { awardXP } = useXPWithSound();
  const { user } = useAuth();

  const addXP = (amount) => {
    const result = awardXP(amount);
    console.log(`Added ${amount} XP. Leveled up: ${result.leveledUp}`);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '20px', 
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', 
      padding: '15px', 
      borderRadius: '12px', 
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: 9995,
      color: 'white',
      minWidth: '200px'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
        ⚡ XP & Level Test
      </h4>
      
      <div style={{ marginBottom: '12px', fontSize: '12px' }}>
        <div>Level: {user?.level || 0}</div>
        <div>XP: {user?.currentXP || 0}/{user?.nextLevelXP || 100}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          onClick={() => addXP(10)}
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          +10 XP
        </button>
        
        <button
          onClick={() => addXP(25)}
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          +25 XP
        </button>
        
        <button
          onClick={() => addXP(100)}
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          +100 XP (Level Up!)
        </button>
      </div>
      
      <p style={{ 
        margin: '12px 0 0 0', 
        fontSize: '11px', 
        opacity: 0.8,
        lineHeight: '1.3'
      }}>
        💡 Add XP to test level up sounds!<br/>
        Check console for level up events.
      </p>
    </div>
  );
};

export default XPTest;
