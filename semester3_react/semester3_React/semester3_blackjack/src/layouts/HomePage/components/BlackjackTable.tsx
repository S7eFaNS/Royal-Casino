import background from "../../../images/casino_background.jpeg"


export const BlackjackTable = () =>{
    return (
        <div className='container my-5'>
          <div className='row p-4 align-items-center border shadow-lg'>
            <div className='col-lg-7 p-3'>
              <h1 className='display-4 fw-bold'>
                Play Blackjack and Win Big!
              </h1>
              <p className='lead'>
                Test your luck and skills with our exciting Blackjack game.
                Will you beat the dealer and win big?
              </p>
              <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                <a className='btn main-color btn-lg text-white' href='/blackjack'>
                  Start Playing
                </a>
              </div>
            </div>
            <div className='col-lg-4 offset-lg-1 shadow-lg'>
              <img
                src={background}
                alt='Blackjack'
                className='img-fluid'
              />
            </div>
          </div>
        </div>
    );
}