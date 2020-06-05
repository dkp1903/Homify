import React, { Component } from 'react'
import './style.css'

class Contact extends Component {
   render() {
      return (
         <section className="hero is-fullheight-with-navbar has-text-centered">
            <div className="hero-body">
               <div className="container">
                  <h1 className="title is-spaced is-narrow" id='contactTile'>Contact Us</h1>
                  <h2 className="subtitle is-narrow columns is-centered is-vcentered">
                     <a
                        className="icon"
                        href="https://goo.gl/maps/cB5fS21HX7pA4MpW9"
                     >
                        <i className="fas fa-map-marker-alt"></i>
                     </a>
                     <span className="column is-narrow">DA-IICT, Gandhinagar</span>
                  </h2>
                  <h2 className="subtitle is-narrow columns is-centered is-vcentered">
                     <a className="icon" href="tel:+9107968262700">
                        <i className="fas fa-phone"></i>
                     </a>
                     <span className="column is-narrow">Phone: (+91) 079-68261700</span>
                  </h2>
                  <h2 className="subtitle is-narrow columns is-centered is-vcentered">
                     <a className="icon" href="mailto:info@daiict.ac.in">
                        <i className="fas fa-envelope"></i>
                     </a>
                     <span className="column is-narrow">Email: info@daiict.ac.in</span>
                  </h2>
                  <h2 className="subtitle is-narrow">
                     <a
                        className="icon is-medium"
                        href="https://facebook.com/daiict"
                     >
                        <i className="fab fa-facebook"></i>
                     </a>
                     <a
                        className="icon is-medium"
                        href="https://instagram.com/daiictofficial"
                     >
                        <i className="fab fa-instagram"></i>
                     </a>
                     <a
                        className="icon is-medium"
                        href="https://www.linkedin.com/school/dhirubhai-ambani-institute-of-information-and-communication-technology/"
                     >
                        <i className="fab fa-linkedin"></i>
                     </a>
                  </h2>
               </div>
            </div>
            <div className="hero-footer"></div>
         </section>
      )
   }
}

export default Contact