import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css'
import robots from './mockdata/robots.json'
import Robot from './components/Robos'
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.robotList}>
        {robots.map(r =>
          <Robot id={r.id} name={r.name} email={r.email} />
        )}
      </div>
    </div>
  );
}

export default App;
