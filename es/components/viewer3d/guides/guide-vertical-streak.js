import * as Three from 'three';
import { List } from 'immutable';
import { COLORS } from '../../../shared-style';

export default function (width, height, guide, font) {
  var step = guide.properties.get('step');
  var colors = guide.properties.has('color') ? new List([guide.properties.get('color')]) : guide.properties.get('colors');

  var streak = new Three.Object3D();

  var counter = 0;

  for (var i = 0; i <= width; i += step) {

    var geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3(i, 0, 0));
    geometry.vertices.push(new Three.Vector3(i, 0, -height));
    var color = colors.get(counter % colors.size);
    var material = new Three.LineBasicMaterial({ color: color });

    if (counter % 5 == 0) {
      var shape = new Three.TextGeometry(counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      var wrapper = new Three.MeshBasicMaterial({ color: COLORS.black });
      var words = new Three.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(i - 20, 0, 50);
      streak.add(words);
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
}