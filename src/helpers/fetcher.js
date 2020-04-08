export default (...args) => fetch(...args).then((r) => r.json());
