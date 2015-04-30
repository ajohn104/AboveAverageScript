// This            ::= '_'
module.exports = function(env, at, next, debug) {
    return {
        loadData: function() {},
        is: function() {
            var entity = new This();
            var found = at('_');
            if(found) env.last = entity;
            return found;
        }
    };
};

var This = function() {
    this.isSingular = function() { return true; };
    this.toString = function(indentlevel, indLvlHidden) {
        return 'this';
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        write(scope.ind(indents) + 'this');
    };
};