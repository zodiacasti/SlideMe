import React from "react";
import GoToBar from "./GoToBar";

class ImageList extends React.Component {
  state = {
    counter: 0,
    threshold: 150, // min distance
    allowedTime: 250, // maximum time allowed
    startX: null,
    startY: null,
    dist: null,
    elapsedTime: null,
    startTime: null,
    touchPageY: null
  };

  nextImage = () => {
    let counter = this.state.counter;
    this.setState({ counter: counter === 9 ? 0 : counter + 1 }); // 9 here because there will be always list of 10 images it's not a magic number
  };

  goToImage = value => {
    this.setState({ counter: value * 1 - 1 }); // don't get confused here, just simply converting string value to number value and substracting 1 since we got an array which is 0 index based
  };

  touchStart = e => {
    let touch = e.changedTouches[0];
    this.setState({
      dist: 0,
      startX: touch.pageX,
      startY: touch.pageY,
      startTime: new Date().getTime() // record time when finger first makes contact
    });

    e.preventDefault();
  };

  touchMove = e => {
    e.preventDefault();
  };

  touchEnd = e => {
    let touch = e.changedTouches[0];
    // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100

    this.setState({
      touchPagey: touch.pageY,
      dist: touch.pageX - this.state.startX,
      elapsedTime: new Date().getTime() - this.state.startTime // record time when finger first makes contact
    });

    e.preventDefault();
  };

  render() {
    // console.log(
    //   this.state.elapsedTime <= this.state.allowedTime &&
    //     this.state.dist >= this.state.threshold &&
    //     Math.abs(this.state.touchPagey - this.state.startY) <= 100
    // );

    return (
      <>
        {this.props.images.length > 0 && (
          <>
            <GoToBar onSubmit={this.goToImage} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {this.props.images.map(({ desctiption, id, urls }, i) => {
                if (i === this.state.counter) {
                  return (
                    <img
                      onTouchStart={this.touchStart}
                      onTouchMove={this.touchMove}
                      onTouchEnd={this.touchEnd}
                      width={500}
                      onClick={this.nextImage}
                      key={id}
                      alt={desctiption}
                      src={urls.regular}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
      </>
    );
  }
}

export default ImageList;
