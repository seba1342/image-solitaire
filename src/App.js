import React from 'react';
import { throttle } from 'lodash';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      mouseX: 0,
      mouseY: 0,
    };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  //

  ctx;
  img;
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', throttle(this.updateWindowDimensions));
    window.addEventListener("mousemove", throttle(e => this.updateMousePosition(e), 25));

    const canvas = this.canvasRef.current;
    this.img = this.imageRef.current;
    this.ctx = canvas.getContext("2d");
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener("mousemove", this.updateMousePosition);
  }

  //

  drawImage = () => {
    const {mouseX, mouseY} = this.state;

    if(mouseX === 0 && mouseY === 0) return;
    
    this.ctx.drawImage(this.img, this.state.mouseX, this.state.mouseY, this.img.width / 2, this.img.height / 2);
  }

  updateMousePosition = e => {
    this.setState({ mouseX: e.clientX, mouseY: e.clientY });

  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  //

  render() {
    return (
      <div className="App">
        <h1 className="text">Image Solitaire</h1>
        <canvas id="canvas" ref={this.canvasRef} width={this.state.width} height={this.state.height} onMouseMove={this.drawImage}></canvas>
        <img ref={this.imageRef} alt="Ocean" src={require("./assets/images/dodgeball.jpeg")} style={{display: 'none'}} />
      </div>
    );
  }  
}

export default App;