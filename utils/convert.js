const convert = (from, to) => str => Buffer.from(str, from).toString(to);

const utf8ToHex = convert('utf8', 'hex');
const hexToUtf8 = convert('hex', 'utf8');

module.exports = {
    hexToUtf8,
    utf8ToHex
};