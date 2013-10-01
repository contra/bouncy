var through = require('through');

var reg = /^(\S+)\s+(\S+)\s+(HTTP\/\d\.\d)$/gm;

module.exports = function (opts) {
    var tr = through(write);
    var replacer = function (_, m, p, ver) {
        return (opts.method || m).toUpperCase()+' '+(opts.path || p)+' '+ver;
    };
    return tr;
    
    function write (buf) {
        if (buf.length <= 10) return this.emit('data', buf);

        var line = String(buf);
        if (opts.method || opts.path) {
            line = line.replace(reg, replacer);
        }

        this.emit('data', line);
    }
};