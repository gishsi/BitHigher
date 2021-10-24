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
  