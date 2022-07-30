import React, { useState, useEffect, useCallback } from "react";
import useTruncatedAddress from "./hooks/useTruncatedAddress";
import { connector } from './config/web3/redes'

import "./globals.scss";
import useNft from "./hooks/RedMumbai"
import { useWeb3React } from "@web3-react/core"

function App({props}) {
  const {
    link_1,
    link_2,
    link_3,
    link_4,
    lang_top,
    lang_bottom,
    lang_top_mobile,
    lang_bottom_mobile,
    title_1,
    image_url_father,
    image_url_children,
    description_1,
    title_2,
    description_2,
    sub_description_1,
    sub_description_2,
    sub_description_3,
    footer_1,
    locate_href
  } = props

  //conexion metamask

  const { active, activate, deactivate, account, error, library } =
  useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);


  const truncatedAddress = useTruncatedAddress(account);

  console.log(truncatedAddress)
    const [numero, setNumero] = useState("0")

    const contadorNumero = (e) =>{
    setNumero(e.target.value)
    }

    

    const contractNft = useNft();

   const mintear = () => {
    contractNft.methods.mint(numero).send({
      from:account,
     value: "20000000000000000" * numero
    });
   }

  const [clicked, setClicked] = useState(false);
  const [lang, setLang] = useState(false);


  const handleLangMovile = () => {

  }

  
  const handleLang = () => {
    if (lang) {
      setTimeout(function () {
        setLang(false);
      }, 1000);
    } else {
      setLang(true);
    }
  };

  const handleMobileLang = () => {
    lang ? setLang(false) : setLang(true)
  }

  const handleClick = () => {
    setClicked(!clicked);
  };

  const routeLang = () => {
    window.location.href = (locate_href)
  }


  return (
    <main>
      <header className="header">
        <nav className="nav">
          <button onClick={connect}>Conectar metamask</button>
          <img src="/images/navbar-logo.png" alt="" width={170} />
          <ul className="nav-items">
            <li>
              <a href="#">{link_1}</a>
            </li>
            <li>
              <a href="#">{link_2}</a>
            </li>
            <li>
              <a href="#">{link_3}</a>
            </li>
            <li>
              <a href="#">{link_4}</a>
            </li>
            <li>
              
              <div className="container_langs">
                <p onMouseLeave={handleLang} onMouseEnter={handleLang}> <img src={image_url_father}></img>{lang_top} <i class="fa-solid fa-sort-down"></i></p>
                <div onMouseLeave={handleLang} onMouseEnter={handleLang} className={ !lang ? "none sub_language" : "sub_language"}>
                   <small onClick={routeLang}><img src={image_url_children}></img>{lang_bottom}</small>
                </div>
              </div>
            </li>
          </ul>
          <ul className="nav-media">
            <a href="#">
              <img src="/svg/facebook.svg" alt="#" />
            </a>
            <a href="#">
              <img src="/svg/instagram.svg" alt="#" />
            </a>
            <a href="#">
              <img src="/svg/youtube.svg" alt="#" />
            </a>
            <a href="#">
              <img src="/svg/twitter.svg" alt="#" />
            </a>
          </ul>
        </nav>
        <nav className="responsiveNav">
          <img
            className="responsive-logo"
            src="/images/navbar-logo.png"
            alt=""
            width={350}
          />
          <div className="responsiveNav-main">
            <button onClick={handleClick} class="responsiveNav-ham">
              <div></div>
              <div></div>
              <div></div>
            </button>
            <ul className="responsiveNav-media">
              <a href="#">
                <img src="/svg/facebook.svg" alt="#" />
              </a>
              <a href="#">
                <img src="/svg/instagram.svg" alt="#" />
              </a>
              <a href="#">
                <img src="/svg/youtube.svg" alt="#" />
              </a>
            </ul>
            <div className="container_langs_mobile">
                <p onClick={handleMobileLang}> <img src={image_url_father}></img>{lang_top_mobile} <i class="fa-solid fa-sort-down"></i></p>
                  <div className={ !lang ? "none sub_language" : "sub_language"}>
                      <small onClick={routeLang}><img src={image_url_children}></img>{lang_bottom_mobile}</small>
                  </div>
              </div>
          </div>
          {clicked ? (
            <ul className="showNav">
              <li onClick={handleClick}>
                <a href="#">{link_1}</a>
              </li>
              <li onClick={handleClick}>
                <a href="#">{link_2}</a>
              </li>
              <li onClick={handleClick}>
                <a href="#">{link_3}</a>
              </li>
              <li onClick={handleClick}>
                <a href="#">{link_4}</a>
              </li>
            </ul>
          ) : (
            <div display="none"></div>
          )}
        </nav>
        <img className="floating1" src="/images/float-leftup.jpg" alt="#" />
        <img className="floating2" src="/images/float-leftdown.png" alt="#" />
        <img className="floating3" src="/images/float-rightup.png" alt="#" />
        <img className="floating4" src="/images/float-rightdown.jpg" alt="#" />
        <div className="cube1"></div>
        <div className="cube2"></div>
        <div className="cube3"></div>
        <div className="cube4"></div>
        <div className="main-header">
          <p>{title_1}</p>
          <div className="button-container">
            <button onClick={mintear}>Minting</button>
          </div>
          <div className="header-separation"></div>
          <p className="header-price">0.35 ETH</p>
          <h4 className="header-priceInfo">
            {description_1}
          </h4>
        </div>
      </header>
      <section className="recuerda">
        <div className="recuerda-left">
          <h3>{title_2}</h3>
          <div className="recuerda-separation"></div>
          <p>
            {description_2}
          </p>
          <p>
            {sub_description_1}
          </p>
          <p>
            {sub_description_2}
          </p>
        </div>
        <div className="recuerda-right">
          <img src="/images/section.png" alt="" width={420} />
        </div>
      </section>
      <footer className="footer">
        <div className="footer-up">
          <img src="/images/navbar-logo.png" alt="" width={324} />
          <p>
            {footer_1}
          </p>
          <div className="footer-media">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="25px"
                height="25px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 486.037 1000"
              >
                <path d="M124.074 1000V530.771H0V361.826h124.074V217.525C124.074 104.132 197.365 0 366.243 0C434.619 0 485.18 6.555 485.18 6.555l-3.984 157.766s-51.564-.502-107.833-.502c-60.9 0-70.657 28.065-70.657 74.646v123.361h183.331l-7.977 168.945H302.706V1000H124.074" />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="25px"
                height="25px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.465 1.066C8.638 1.012 9.012 1 12 1c2.988 0 3.362.013 4.534.066c1.172.053 1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12c0 2.988-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.396 5.396 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066c-2.988 0-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.397 5.397 0 0 1-1.949-1.268a5.392 5.392 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12c0-2.988.013-3.362.066-4.534c.053-1.172.24-1.972.511-2.672a5.396 5.396 0 0 1 1.27-1.948a5.392 5.392 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511Zm8.98 1.98c-1.16-.053-1.508-.064-4.445-.064c-2.937 0-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.412 3.412 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445c0 2.937.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064c2.938 0 3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445c0-2.937-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.413 3.413 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379Zm-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986ZM8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996Zm10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="25px"
                height="25px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578a9.3 9.3 0 0 1-2.958 1.13a4.66 4.66 0 0 0-7.938 4.25a13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568a4.692 4.692 0 0 1-2.104.08a4.661 4.661 0 0 0 4.352 3.234a9.348 9.348 0 0 1-5.786 1.995a9.5 9.5 0 0 1-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254c0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003Z" />
              </svg>{" "}
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="25px"
                height="25px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 1024 1024"
              >
                <path d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133l-232 135z" />
              </svg>{" "}
            </button>
          </div>
        </div>
        <div className="footer-separation"></div>
        <div className="footer-down">
          <p>© 2022 FridaK. All rights reserved</p>
          <p>Diseñado por kratem.net</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
