export const AppServices = () => {
    return (
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Deposit now!
                    </h1>
                    <p className='lead'>
                        Deposit now and start betting on our blackjack, where you can earn more money. We also have a marketplace
                        where you can purchase your favorite csgo skins. Deposit now and start playing!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        <a className='btn main-color btn-lg text-white' href='/deposit'>
                            Deposit
                        </a>
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    );
}