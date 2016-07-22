'use strict';

import React from 'react';
import {render} from 'react-dom';
import './style.scss';
// import {fabric} from 'fabric-webpack';

import Canvas from 'react-fabricjs/Canvas';
import Circle from 'react-fabricjs/shape/Circle';
import Path from 'react-fabricjs/shape/Path';
// import PathGroup from 'react-fabricjs/shape/PathGroup';
import Image from 'react-fabricjs/Image';
import Text from 'react-fabricjs/Text';
import IText from 'react-fabricjs/IText';
// import Ellipse from 'react-fabricjs/shape/Ellipse';
// import Triangle from 'react-fabricjs/shape/Triangle';

// const image = new Image();
// image.src = "http://fabricjs.com/assets/honey_im_subtle.png";

class Example extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			color: 'blue',
			newObject: null,
		};
	}

	changeColor() {
		if (this.state.color === 'blue') {
			this.setState({color: 'red'});
		} else {
			this.setState({color: 'blue'});
		}
	}

	setBackgroundImage() {
		// this.refs.canvas.setBackgroundImage(
		// 	'http://fabricjs.com/assets/honey_im_subtle.png',
		// 	this.refs.canvas.renderAll,
		// 	{
		// 		originX: 'left',
		// 		originY: 'top',
		// 		crossOrigin: 'anonymous',
		// 		width: 300,
		// 		height: 300,
		// 	}
		// );

		// Image.fromURL(, (img) => {
		// 	this.refs.canvas.add(img);
		// });
	}

	setAnimation() {
		this.refs.canvas.getChild('circle').animate('left', '+=100', {
			onChange: () => this.refs.canvas.renderAll(),
			onComplete: () => console.log('onComplete'),
		});
	}

	addNew() {
		if (this.state.newObject) {
			return this.setState({newObject: null});
		}
		this.setState({
			newObject: [
				<Image
					key="big"
					src="http://i.imgur.com/jZsNUCi.jpg"
					width={300}
					height={300}
					left={0}
					top={500}
				/>,
				<Image
					key="small"
					src="http://i.imgur.com/jZsNUCi.jpg"
					width={250}
					height={250}
					left={200}
					top={300}
				/>,
			]
		});
	}

	render() {
		return (
			<div className="main-container">
				<Canvas
					ref="canvas"
					width="1000"
					height="1000"
				>
					<Circle
						ref="circle"
						radius={20}
						fill={this.state.color}
						left={100}
						top={50}
						stroke="green"
					/>

					<Image
						ref="image"
						imgElement={document.getElementById('my-image')}
						width={100}
						height={100}
					/>

					{this.state.newObject}

					<Path
						path="M 0 0 L 300 100 L 200 300 z"
						fill="red"
						stroke="green"
						strokeWidth={10}
						opacity={0.5}
					/>

					<Text
						text="Click me"
						left={0}
						top={200}
						shadow="rgba(0,0,0,0.3) 5px 5px 5px"
						stroke="#ff1318"
					  strokeWidth={1}
						fontStyle="italic"
					  fontFamily="Hoefler Text"
					/>
				<IText text="Edit me" top={300} left={10} />
				</Canvas>

				<button onClick={this.changeColor.bind(this)}>Color</button>
				<button onClick={this.setBackgroundImage.bind(this)}>Image</button>
				<button onClick={this.setAnimation.bind(this)}>Animate</button>
				<button onClick={this.addNew.bind(this)}>NEW</button>
			</div>
		);
	}
}


render(
	<Example />,
	document.getElementById('root')
);
