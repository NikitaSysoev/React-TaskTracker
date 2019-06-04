let id = 0;

export default function(prefix = 'id') {
  id++;
  return `${prefix}${id}`;
}
