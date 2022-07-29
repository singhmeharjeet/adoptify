import React from 'react'

export default function NavModal({handleLogout, exit}) {

    const overlay = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000
    }
    
    const modal = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
    }

  return (
    <>
        <div style={overlay} onClick={exit}/>
        <div style={modal}>
            <button onClick={handleLogout}>Confirm Logout</button>
            <button onClick={exit}>Cancel</button>
        </div>
    </>
  )
}
