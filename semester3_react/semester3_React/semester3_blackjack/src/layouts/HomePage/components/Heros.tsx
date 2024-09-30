export const Heros = () => {
    return (
        <div>
            <div className='d-none d-lg-block p-3'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Win more playing Blackjack</h1>
                            <p className='lead'>
                                You can win more money by playing our Blackjack game. That way you can purchase even better
                                csgo skins. Try out our Blackjack game mode now!
                            </p>
                            <a className='btn main-color btn-lg text-white' href='/blackjack'>Start Playing</a>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our market is always expanding!</h1>
                            <p className='lead'>
                                Try to check in daily so you don't miss our best offers on your
                                favorite csgo skins. We have some of the best prices in the market.
                            </p>
                            <a className='btn main-color btn-lg text-white' href='/market'>Shop Now</a>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Win more playing Blackjack</h1>
                            <p className='lead'>
                                Play Blackjack now!
                            </p>
                            <a className='btn main-color btn-lg text-white' href='/blackjack'>Start Playing</a>
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our market is always expanding!</h1>
                            <p className='lead'>
                                Purchase your favorite csgo skins!
                            </p>
                            <a className='btn main-color btn-lg text-white' href='/market'>Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}