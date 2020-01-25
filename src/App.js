import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import UploadButtons from './components/UploadButtons'
import Canvas from './components/Canvas'
import Tabs from './components/VerticalTabs'
import TextField from '@material-ui/core/TextField'
//import Konva from 'react-konva'
//import CanvasComponent from './components/CanvasComponent'
import './App.css'

class App extends Component {
  state = { 
    file: "", 
    imagePreviewUrl: "",
    imageExportedURL: "",
    text: "葦名",
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

  handleExport = (e) => {
    this.setState({imageExportedURL: this.stageRef.getStage().toDataURL()})
    this.setState({selectShape: null})
  }

  handleName = (e) => {
    this.setState({text: e.target.value})
  }

  render() {
    //console.log("imagePreviewUrl=" + this.state.imagePreviewUrl);
    return (
      <div>
        <div id="container">
          <Canvas img={this.state.imagePreviewUrl} text={this.state.text} id='canvas' stageRef={node=>{this.stageRef=node}} />
          <UploadButtons onChange={this.handleFileChange} value="画像を選択" id="uploadbtn" />
          <Button onClick={this.handleExport} variant="outlined" id="exportbtn" component="span">出力</Button>
          <form id="form"　noValidate autoComplete="off">
            <TextField
              label="キャラクター名"
              multiline
              rowsMax="3"
              variant="outlined"
              onChange={this.handleName}
              value={this.state.text}
            />
          </form>
          <Tabs 
            component={<img src={this.state.imageExportedURL}
            alt=""
            className="charaimg"
          />}/>
        </div>
        <Button variant="outlined">share on twitter</Button>
      </div>
    )   
  }
}

export default App;
