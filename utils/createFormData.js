export default function createFormData(iterable) {
  const formData = new FormData();
  Object.keys(iterable).forEach((key) => {
    const val = iterable[key];
    formData.append(key, val instanceof FileList ? val[0] : val);
  });
  return formData;
}
