import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

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

export default function Modal({postInfo, closeModal}) {

    
    // console.log(postData)
    return (
        <>
            {/* <div style={overlay}/>
            <div style={modal}>
                <div>{postData.postid}</div>
                <div>{postData.pet_name}</div>
                <div>{postData.pet_species}</div>
                <div>{postData.description}</div>
                <button onClick={closeModal}>CLOSE MODAL</button>
            </div> */}
            <div style={overlay} onClick={closeModal}/>
            <div style={modal}>
                <div className="post" key={postInfo?.postid}>
                    <div className="post-image-container">
                        <img className="post-picture" src={postInfo.images[0]} />
                    </div>
                    <div className="post-contents">
                        <div className="post-content-upper">
                            <div className="post-title">
                                <p className="pet-name">{postInfo?.pet_name}</p>
                                <p className="pet-species">
                                    {postInfo?.pet_species}
                                </p>
                            </div>
                            <div className="post-buttons">
							<button
								className="post-edit-button"
								onClick={closeModal}
							>
								CLOSE
							</button>
						</div>
                        </div>
                        <p className="pet-description">{postInfo?.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
