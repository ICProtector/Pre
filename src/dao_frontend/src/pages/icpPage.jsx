import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../App.css' 
import IcpContent from '../components/icpContent';
import { useTheme } from '../contexts/ThemeContext';

function IcpPage() {
  
  const { darkMode, toggleTheme } = useTheme();
  const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
 

  return (
    <>
      <Navbar />
      <div className={`${gradientClass} dark:bg-gray-800`} style={{ minHeight:'100vh'}}>
        <IcpContent/>
      </div>
    </>
  )
}

export default IcpPage
