/**
 * This is a simple helper function for collision detection that detects the overlap.
 * I am using it later for more complex collision detection sometimes referred to as "Tunnelling".
 *
 * @param obj - the first object for collision detection
 * @param other  - the second object for collision detection
 * @returns true if there was an overlap, false otherwise
 * @author: Julia Drozdz
 */
export function detect(obj, other) {
  if (
    obj.l > other.r ||
    obj.r < other.l ||
    obj.t > other.b ||
    obj.b < other.t
  ) {
    return false;
  }
  return true;
}
