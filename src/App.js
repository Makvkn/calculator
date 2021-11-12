import './App.css';
import React from "react";
import ReactDOM from "react-dom";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = [ '/', '*', '-', '+'];
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }


  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0',
        });
        break;
      }

      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }

      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.'
          })
        }

        break;
      }

      default: {
        let e = undefined;
        // check for other op
        if(ops.includes(innerText)) {
          if(ops.includes(lastPressed) && innerText !== '-') {
            // oh boii...
            const lastNumberIdx = calc.split('').reverse()
                .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }

        this.setState({
          calc: e
        });
      }
    }

    this.setState({
      lastPressed: innerText
    })

  }

  render() {
    const { currentNumber, calc } = this.state;

    return (
        <div className="calculator">
          <div id="display" className="display">
            {calc}
          </div>

          <div className="nums-container">
            <button
                className="big-h light-grey ac"
                onClick={this.handleClick}
                id="clear"
            >
              AC
            </button>

            {nums.map(num => (
                <button
                    className={`dark-grey ${num === 0 && 'big-h'}`}
                    key={num}
                    onClick={this.handleClick}
                    id={ids[num]}
                >
                  {num}
                </button>
            ))}

            <button
                className="light-grey"
                onClick={this.handleClick}
                id="decimal"
            >
              .
            </button>
          </div>
          <div className="ops-container">
            {ops.map(op => (
                <button
                    className="orange"
                    key={op}
                    onClick={this.handleClick}
                    id={ids[op]}
                >
                  {op}
                </button>
            ))}

            <button
                className="orange"
                onClick={this.handleClick}
                id="equals"
            >
              =
            </button>
          </div>
        </div>
    )
  }
}

export default App;


/*<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <link rel="icon" href="/favicon.ico"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="Web site created using create-react-app"/>
    <link rel="apple-touch-icon" href="/logo192.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <title>React App</title>
    <link href="/static/css/main.44aae447.chunk.css" rel="stylesheet">
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">

</div>
<script>
    !function(e){
        function r(r){
            for(var n,a,i=r[0],c=r[1],l=r[2],s=0,p=[];s<i.length;s++)
                a=i[s],
                Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(f&&f(r);p.length;)p.shift()();return u.push.apply(u,l||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,i=1;i<t.length;i++){var c=t[i];0!==o[c]&&(n=!1)}n&&(u.splice(r--,1),e=a(a.s=t[0]))}return e}var n={},o={1:0},u=[];function a(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.e=function(e){var r=[],t=o[e];if(0!==t)if(t)r.push(t[2]);else{var n=new Promise((function(r,n){t=o[e]=[r,n]}));r.push(t[2]=n);var u,i=document.createElement("script");i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.src=function(e){return a.p+"static/js/"+({}[e]||e)+"."+{3:"23af689d"}[e]+".chunk.js"}(e);var c=new Error;u=function(r){i.onerror=i.onload=null,clearTimeout(l);var t=o[e];if(0!==t){if(t){var n=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;c.message="Loading chunk "+e+" failed.\n("+n+": "+u+")",c.name="ChunkLoadError",c.type=n,c.request=u,t[1](c)}o[e]=void 0}};var l=setTimeout((function(){u({type:"timeout",target:i})}),12e4);i.onerror=i.onload=u,document.head.appendChild(i)}return Promise.all(r)},a.m=e,a.c=n,a.d=function(e,r,t){a.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,r){if(1&r&&(e=a(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)a.d(t,n,function(r){return e[r]}.bind(null,n));return t},a.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(r,"a",r),r},a.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},a.p="/",a.oe=function(e){throw console.error(e),e};var i=this.webpackJsonpcalculator=this.webpackJsonpcalculator||[],c=i.push.bind(i);i.push=r,i=i.slice();for(var l=0;l<i.length;l++)r(i[l]);var f=c;t()}([])</script><script src="/static/js/2.a22821a9.chunk.js">

</script><script src="/static/js/main.fc96371c.chunk.js"></script></body></html>*/