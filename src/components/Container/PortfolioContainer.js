import React, { Component } from "react";
import NavTabs from "./components/NavTabs";
import AddBooks from "../../pages/AddBooks";
import Books from "../../pages/Books";

class Portfolio extends Component {
  state = {
    currentPage: "Home"
  };

  handlePageChange = page => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Books") {
      return <Books />;
    } else if (this.state.currentPage === "AddBooks") {
      return <AddBooks />;
    } else {
      return <Books />;
    }
  };

  render() {
    return (
      <div>
        <NavTabs
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default Portfolio;
