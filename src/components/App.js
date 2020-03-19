import React from "react";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

const API_KEY =
  "5d119fe7a076784c7fac774f2708743380d672efc72f99af60909f0f4cca124f"; // this is my access key which I got from unsplash api

class App extends React.Component {
  state = { images: [] };

  //here we are getting list of 10 images according to a value we pass into url parameter
  onSearchSubmit = async term => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?query=${term}&client_id=${API_KEY}`
    ).then(res => res.json());
    this.setState({
      images: response.results
    });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "12px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
