import { React } from 'react';
import { Stage, Layer, Group, Image, Circle } from 'react-konva';
import img1 from '../assets/EOaRkpnUYAAyvbn-orig.jpg'

const width = window.innerWidth;
const height = window.innerHeight;

function update(activeAnchor) {
  const group = activeAnchor.getParent();

  const topLeft = group.get('.topLeft')[0];
  const topRight = group.get('.topRight')[0];
  const bottomRight = group.get('.bottomRight')[0];
  const bottomLeft = group.get('.bottomLeft')[0];
  const image = group.get('Image')[0];

  var anchorX = activeAnchor.getX();
  var anchorY = activeAnchor.getY();

  // update anchor positions
  // eslint-disable-next-line default-case
  switch (activeAnchor.getName()) {
    case 'topLeft':
      topRight.y(anchorY);
      bottomLeft.x(anchorX);
      break;
    case 'topRight':
      topLeft.y(anchorY);
      bottomRight.x(anchorX);
      break;
    case 'bottomRight':
      bottomLeft.y(anchorY);
      topRight.x(anchorX);
      break;
    case 'bottomLeft':
      bottomRight.y(anchorY);
      topLeft.x(anchorX);
      break;
  }

  image.position(topLeft.position());

  let width = topRight.getX() - topLeft.getX();
  let height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }
}
function addAnchor(group, x, y, name) {
  let stage = group.getStage();
  let layer = group.getLayer();

  var anchor = new Circle({
    x: x,
    y: y,
    stroke: '#666',
    fill: '#ddd',
    strokeWidth: 2,
    radius: 8,
    name: name,
    draggable: true,
    dragOnTop: false
  });

  anchor.on('dragmove', function() {
    update(this);
    layer.draw();
  });
  anchor.on('mousedown touchstart', function() {
    group.draggable(false);
    this.moveToTop();
  });
  anchor.on('dragend', function() {
    group.draggable(true);
    layer.draw();
  });
  // add hover styling
  anchor.on('mouseover', function() {
    var layer = this.getLayer();
    document.body.style.cursor = 'pointer';
    this.strokeWidth(4);
    layer.draw();
  });
  anchor.on('mouseout', function() {
    var layer = this.getLayer();
    document.body.style.cursor = 'default';
    this.strokeWidth(2);
    layer.draw();
  });
  return(
      <Group>
          <anchor />
      </Group>
  )
}

export default function Canvas(props) {
    return (
      <React.Fragment>
        <Stage
            container='container'
            width={width}
            height={height}
        >
            <Layer>
            <Group>
                    <Image
                        width={200}
                        height={137}
                        image={img1}
                    />
                    <Image
                        width={93}
                        height={104}
                        image={img1}
                    />

                </Group>
                <Group>
                    <Image
                        width={200}
                        height={137}
                        image={img1}
                    />
                    <Image
                        width={93}
                        height={104}
                        image={img1}
                    />

                </Group>
            </Layer>
        </Stage>
      </React.Fragment>
    )
}