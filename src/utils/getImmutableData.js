export default function getImmutableData(data, keys) {
  const exportedData = {};
  keys.forEach((key) => { exportedData[key] = (data.get(key)); });
  return exportedData;
}
