export default function getData(len = 50) {
  return Array.from({ length: len }, (_, i) => {
    return {
      key: i,
      name: Math.random()
        .toString(16)
        .replace('.', ''),
      gender: Math.random() > 0.5 ? '女' : '男',
      age: (22 + Math.random() * 20) | 0,
      address: Math.random()
        .toString(16)
        .replace('.', '')
    }
  })
}
