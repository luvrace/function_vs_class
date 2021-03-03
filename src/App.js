import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="App">
      Hello
      <input type="button" value="remove func" 
       onClick={function(){
         setFuncShow(false);
       }}
      />
      <input type="button" value="remove comp" 
       onClick={function (){
         setClassShow(false);
      }}/>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null }
      {classShow ? <ClassComp initNumber={2}></ClassComp>:null}
    </div>
  );
}

var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props){
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
  console.log('number State', number);

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  var [_date, setDate] = useState((new Date()).toString());

  //side effect
  //[number] -> number의 값이 바꼈을때만! 리로드 된다
  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
    document.title = number + ':' + _date;
    return function(){
      console.log('%cfunc => useEffect return (componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
      
    }
  }, [number]);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : { number }</p>
      <p>Date : { _date }</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }/>
      <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }
        }/>
      
    </div>
  )
}

class ClassComp extends React.Component {
  state = {
    number : this.props.initNumber,
    date : (new Date()).toString()
  }

  // handleRandom = ()=> {
  //   this.setState({
  //     number : Math.random()
  //   })
  // }


  render(){
    
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }/>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }/>
        
      </div>
    )
  }
}

export default App;
