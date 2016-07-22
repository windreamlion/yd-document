import React from 'react';
import ReactDOM from 'react-dom';
import Document from './Document';

let config = {bgColor:'#eeeeee',bgImg:'img/art.jpg'};
let templateData = {};

ReactDOM.render(<Document config={config} templateData={templateData}/>, document.getElementById('container'));
