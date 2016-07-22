import React, {PropTypes, Component}  from 'react';
import {fabric} from 'fabric-webpack';
import './style.scss';

// var fabric = require('./fabric');

function getStyles(props, context) {
    // const {tabs} = context.muiTheme;

    return {
        wrapper: {
            backgroundColor: props.config.bgColor ? props.config.bgColor : '',
            width: '100%',
            height: '100%',
        },
        canvas: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: (props.label && props.icon) ? 72 : 48,
        },
    };
}

let canvas;

class Document extends Component {

    static canvasId = 'postCanvas';

    static propTypes = {
        /**
         * The Document setting
         */
        config: PropTypes.object,
        /**
         * templateData
         */
        templateData: PropTypes.object,
        /**
         * callback on canvasElement change state.
         */
        onChanged: PropTypes.func,
        /**
         * Sets the text value of the tab item to the string specified.
         */
    };

    componentDidMount() {
        canvas = new fabric.Canvas(Document.canvasId, {backgroundColor: 'rgb(255,255,255)', width: '500',height:'800'});

        // fabric.Object.prototype.borderColor = '#6dc3d3';
        fabric.Object.prototype.cornerColor = '#6dc3d3';
        // fabric.Object.prototype.cornerStyle = 'circle';
        fabric.Object.prototype.cornerSize = 20;
        // fabric.Object.prototype.cornerStrokeColor = '#ffffff';
        // fabric.Object.prototype.borderScaleFactor = 0.4;
        console.log(fabric.Object.prototype);

        var rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 60,
            height: 70,
            fill: 'red'
        });

        canvas.add(rect);

        console.log(rect.cornerStyle);

        var textBox = new fabric.Text("youde有的", {
            fontSize: '60',
            textAlign:'center'
        });
        textBox.editable = false;
        textBox.cornerStyle = 'circle';

        canvas.add(textBox);


        // canvas.setWidth(400);
        // canvas.setHeight(600);


        // this.setState({canvas}, () => {
        //     this.initEvent.call(this);
        //     Object.keys(this.ref).forEach(key => {
        //         const ref = this.ref[key];
        //         ref.draw(obj => this.add(obj));
        //     });
        // });
    }

    render() {
        const styles = getStyles(this.props);

        return (
            <div className="document-Wrapper" style={styles.wrapper}>
                <canvas id={Document.canvasId}/>
            </div>

        );
    }
}

export  default  Document;
