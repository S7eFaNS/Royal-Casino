/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchSkins } from "../../Utils/API_Calls/Skins/FetchSkins";
import React from 'react';
import { SpinnerLoading } from "../../Utils/Features/SpinnerLoading";
import { ReturnSkin } from "./ReturnSkin";

export const Carousel:React.FC = () => {

    const {skins, isLoading, httpError} = useFetchSkins();


    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    if (skins.length === 0){
        return(
            <div className="container m-5 justify-content-center">
                <p>No skins to display</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find our best skins.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {skins.slice(0, 3).map(skin =>(
                                <ReturnSkin skin = {skin} key = {skin.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {skins.slice(3, 6).map(skin =>(
                                <ReturnSkin skin = {skin} key = {skin.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {skins.slice(6, 9).map(skin =>(
                                <ReturnSkin skin = {skin} key = {skin.id} />
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            
            <div className='d-lg-none mt-3'>
            {skins.length > 0 ? (
                <div className='row d-flex justify-content-center align-items-center'>
                <ReturnSkin skin={skins[0]} key={skins[0].id} />
                </div>
            ) : (
                <p>No skins</p>
            )}
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href='/market'>View More</a>
            </div>
        </div>
    );
}