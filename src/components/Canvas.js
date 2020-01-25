import React, { useState } from 'react';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';
import backgroundImg from '../assets/edited/chara_trim.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
/*
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
*/

/*
const ImageShowT = (props) => {
  let lastDist = 0
  const handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    })
  }
  const handleDragEnd = e => {
    e.target.to({
      duration: 0.2,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    })
  }
  const handleWheel = e => {
    e.target.setAttrs({
      scaleX: 0.5,
      scaleY: 0.5
    })
  }
  const handleTouchMove = e => {
    e.evt.preventDefault();
    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];
    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    if (touch1 && touch2) {
      var dist = getDistance(
        {
          x: touch1.clientX,
          y: touch1.clientY
        },
        {
          x: touch2.clientX,
          y: touch2.clientY
        }
      );
      if (!lastDist){
        lastDist = dist
      }
      let scale = (this.scaleX() * dist) / lastDist;
  
      this.scaleX(scale);
      this.scaleY(scale);
      this.batchDraw();
      lastDist = dist
    }
  }

  let [image] = useImage(props.src)

  return <Image
    image={image}
    draggable
    shadowColor="black"
    shadowBlur={10}
    shadowOpacity={0.6}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onWheel={handleWheel}
    onTouchMove={handleTouchMove}
    stage={props.stage}
  />
}
*/

const ImageShowB = ({ src, ...props }) => {
  let [image] = useImage(src)
  return <Image
    image={image}
    {...props}
  />
}

const ImageShow = ({ src, shapeProps, isSelected, onSelect, onChange }) => {
  let [image] = useImage(src)
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
      <Image
        image={image}
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
          //node.scaleX(1);
          //node.scaleY(1);
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

const initialImages = [
  {
    x: 0,
    y: 0,
    id: 'charaImg'
  }
];
const initialNames = [
  {
    fontSize: 60,
    x: -45,
    y: 720,
    //wrap: 'char',
    rotation: -10,
    width: 600,
    align: 'center',
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    id: 'charaName'
  }
];

const TextShow = ({ text, shapeProps, isSelected, onSelect, onChange }) => {
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
      <Text
        text={text}
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
          //node.scaleX(1);
          //node.scaleY(1);
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

export default function Canvas({ stageRef, text, img , ...props}) {
  const classes = useStyles();
  const [images, setImages] = useState(initialImages);
  const [texts, setText] = useState(initialNames)
  const [selectedId, selectShape] = useState(null);  
    return (
      <div className={classes.root}>
        <Stage
            width={300}
            height={700}
            scaleX={1.01}
            scaleY={1.01}
            x={-104}
            y={-102}
            /*draggable*/
            ref={stageRef}
            style={{ border: '1px solid grey', width: '300px', height: '700px'}}
            onMouseDown={e => {
              // deselect when clicked on empty area
              const clickedOnEmpty = e.target === e.target.getStage()
              if (clickedOnEmpty) {
                selectShape(null)
              }
            }}
            onMouseLeave={e => {
              selectShape(null)
            }

            }
        >
          <Layer>
            <ImageShow
              key={1}
              src={img}
              shapeProps={images[0]}
              isSelected={images[0].id === selectedId}
              onSelect={() => {
                selectShape(images[0].id);
              }}
              onChange={newAttrs => {
                let imgs = images.slice();
                images[0] = newAttrs;
                setImages(imgs);
              }}
            />
          </Layer>
          <Layer>
            <ImageShowB
              src={backgroundImg}
              x={100}
              y={80}
              onMouseDown={() => {
                selectShape(images[0].id)
              }}
            />
          </Layer>

          <Layer>
            {//<ImageShow src={props.img} />
            }
            <TextShow
              text={text}
              shapeProps={texts[0]}
              isSelected={texts[0].id === selectedId}
              onSelect={() => {
                selectShape(texts[0].id);
              }}
              onChange={newAttrs => {
                let txts = texts.slice();
                texts[0] = newAttrs;
                setText(txts);
              }}
            />
          </Layer>

          <Layer>
            {/*
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
            */}
          </Layer>
        </Stage>
        <Button variant="outlined" >回転をリセット</Button>
        <Button variant="outlined" >座標をリセット</Button>
        <Button variant="outlined" >サイズをリセット</Button>
      </div>
    )
}