export default {
  jpath: [],
  getEmpty() {
    return {
      code: '',
      date: Date.now(),
      procedure: '',
      products: [],
      reagents: [],
      conditions: '',
      keywords: [],
      remarks: '',
      title: '',
      reactionRXN: '$RXN\n\n\n\n  0  0\n',
    };
  },
};
