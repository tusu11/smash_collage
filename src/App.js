import React, { Component } from 'react'
import UploadButtons from './components/UploadButtons'
import Canvas from './components/Canvas'
import Tabs from './components/Tabs'

class App extends Component {
  state = { 
    file: "", 
    imagePreviewUrl: "",
  }

  handleFileChange = (e) => {
    console.log('uploaded')
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    if(file != null){
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        }); 
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    console.log("imagePreviewUrl=" + this.state.imagePreviewUrl);
    return (
      <React.Fragment>
        <div>
        <UploadButtons onChange={this.handleFileChange}/>
          <Canvas img={this.state.imagePreviewUrl}/>
          <img src={this.state.imagePreviewUrl} alt="" />
        </div>
        <Tabs />
      </React.Fragment>
    )   
  }
}

export default App;
