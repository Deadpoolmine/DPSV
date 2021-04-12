import React from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
import { BaseCard } from '../Card';

const ReactGridLayout = WidthProvider(RGL);

//  Defined waterfall flow subcomponents , It's true that the application can be encapsulated externally 
class WaterFall extends React.Component {
    static defaultProps = {
      className: "layout",
      isDraggable: false,
      isResizable: false,
      cols: 12,
      rowHeight: 110,
    };

    constructor(props) {
        super(props);
      //  Initialization definition layout  And rendered data 
        this.state = { 
            layout: this.generateLayout([]), 
            data: [] 
        };
    }
  
    //  Update when loading layout and data
    componentDidMount() {
      this.setState({
        data: [...this.props.items],
        layout: this.generateLayout(this.props.items),
      });
    }

    //  Generate every waterfall flow inside item  Function of 
    generateDOM = () => {
      const { data } = this.state;
      return data.map((item, index) => {
        return (
          <div key={index} >
            <BaseCard>
                <div className=""></div>
            </BaseCard>
          </div>
        );
      });
    };
  
    // 布局生成器 
    generateLayout = (items) => {
      return items.map((item, i) => {
        let y = (3 / item.width) * item.height;
        return {
          x: (i * 3) % 12, //  The beginning of each picture x spot  , the reason being that 4 Column , So in 12 In the column is 3 Make a picture 
          y: Math.floor(i / 4) * y, //  Four line breaks 
          w: 3, //  The number of columns occupied by pictures 
          h: y, //  Calculated image height 
          i: i.toString(), // layout Of key value 
        };
      });
    };
  
    render() {
      return (
        <div>
          <ReactGridLayout layout={this.state.layout} {...this.props}>
            {this.generateDOM()}
          </ReactGridLayout>
        </div>
      );
    }
}

export default WaterFall
