import React, { Component } from "react";
import "./Navbar.scss";
import Logo from "../Logos/hnscan";
import * as Navbar from "./styled-components";
import { Redirect, Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNavOpen: false,
      moreActive: false,
      query: "",
      toolsActive: false,
      toSearch: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.toggleTools = this.toggleTools.bind(this);
    this.search = this.search.bind(this);
  }

  // hide/show the mobile nav
  toggleMobileNav() {
    this.setState({ mobileNavOpen: !this.state.mobileNavOpen });
  }

  toggleMore() {
    this.setState({ moreActive: !this.state.moreActive });
  }

  toggleTools() {
    this.setState({ toolsActive: !this.state.toolsActive });
  }

  // handle all search results
  search(e) {
    e.preventDefault();

    // Don't search if there is no query
    if (this.state.query.length === 0) return;

    this.setState({
      toSearch: true
    });
  }

  handleChange(e) {
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    if (this.state.toSearch) {
      return <Redirect to={"/search?=" + this.state.query} />;
    }

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbarContainer">
          {/* ---- Left Side of Navbar (entire navbar on mobile/tablet) ----- */}
          <div className="navbar-brand">
            <a href="/" className="navbar-item">
              <Navbar.LogoWrapper>
                <Logo />
              </Navbar.LogoWrapper>
            </a>
            {/* ----- Mobile/Tablet Nav Burger Menu ------ */}
            <Navbar.TouchMenuWrapper>
              <div
                className={`navbar-burger burger ${
                  this.state.mobileNavOpen ? "is-active" : ""
                }`}
                onClick={this.toggleMobileNav}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </div>
            </Navbar.TouchMenuWrapper>
          </div>
          {/* ----- Middle of Navbar (desktop and greater screen sizes) ----- */}
          <div
            className={`navbar-menu ${
              this.state.mobileNavOpen ? "is-active" : ""
            }`}
            id="navbarBasicExample"
          >
            <div className="navbar-start">
              <Link to="/blocks" id="blocks" className="navbar-item navOption">
                Blocks
              </Link>
              <Link to="/names" id="names" className="navbar-item navOption">
                Names
              </Link>
              <div className="navbar-item has-dropdown is-hoverable navDropdown">
                <Navbar.NavDropdown
                  onClick={this.toggleTools}
                  className="navbarMore navbar-link navOption"
                >
                  Tools
                </Navbar.NavDropdown>
                <div
                  className={`navbar-dropdown ${
                    this.state.toolsActive
                      ? "navbar-dropdown-visible"
                      : "is-hidden-touch"
                  }`}
                >
                  <Link to="/status" className="navbar-item">
                    Node Status
                  </Link>
                  <Link to="/peers" className="navbar-item">
                    Peers
                  </Link>
                  <Link to="/airdropclaim" className="navbar-item">
                    Claim Your Airdrop
                  </Link>
                  <Link to={location => location} className="navbar-item">
                    <s>Mempool</s>
                  </Link>
                  <Link to={location => location} className="navbar-item">
                    <s>Charts</s>
                  </Link>
                  <Link to={location => location} className="navbar-item">
                    <s>Logs</s>
                  </Link>
                  {/* <a href="/airairdrop" className="navbar-item">Airdrop Stats</a> */}
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable navDropdown">
                <Navbar.NavDropdown
                  onClick={this.toggleMore}
                  className="navbarMore navbar-link navOption"
                >
                  More
                </Navbar.NavDropdown>
                <div
                  className={`navbar-dropdown ${
                    this.state.moreActive
                      ? "navbar-dropdown-visible"
                      : "is-hidden-touch"
                  }`}
                >
                  <Link to={location => location} className="navbar-item">
                    <s>About</s>
                  </Link>
                  <Link to={location => location} className="navbar-item">
                    <s>Changelog</s>
                  </Link>
                  <Link to={location => location} className="navbar-item">
                    <s>API Documenation</s>
                  </Link>
                  <a
                    href="https://github.com/HandshakeAlliance/HNScan/issues"
                    className="navbar-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report an issue
                  </a>
                </div>
              </div>
            </div>
            {/* ----- Right side of Navbar (desktop and greater screen sizes) ----- */}
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
