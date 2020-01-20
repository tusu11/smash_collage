import React from 'react';
import { Stage, Layer, Text, Image, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef()
    const trRef = React.useRef()
  
    React.useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.setNode(shapeRef.current)
        trRef.current.getLayer().batchDraw()
      }
    }, [isSelected])
  
    return (
      <React.Fragment>
        <Rect
          onClick={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={e => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y()
            });
          }}
          onTransformEnd={e => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY)
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </React.Fragment>
    )
}
  
const initialRectangles = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1'
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: 'rect2'
    }
]

const ImageShow = (props) => {
    let [image] = useImage(props.src)
    return <Image image={image} />
}
export default function Canvas(props) {
    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [selectedId, selectShape] = React.useState(null);  
    return (
      <React.Fragment>
        <Stage
            width={400}
            height={300}
            style={{ border: '1px solid grey' }}
            onMouseDown={e => {
              // deselect when clicked on empty area
              const clickedOnEmpty = e.target === e.target.getStage();
              if (clickedOnEmpty) {
                selectShape(null);
              }
            }}
        >
            <Layer>
                <ImageShow src={props.img} />
                <Text text="Please upload picture." />
            </Layer>
            <Layer>
              {rectangles.map((rect, i) => {
                return (
                  <Rectangle
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.id);
                    }}
                    onChange={newAttrs => {
                      const rects = rectangles.slice();
                      rects[i] = newAttrs;
                      setRectangles(rects);
                    }}
                  />
                );
              })}
            </Layer>
        </Stage>
      </React.Fragment>
    )
}