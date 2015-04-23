// ExpList         ::= Exp (Newline? ',' Exp)*
module.exports = function(env, at, next, debug) {
    var Exp, Newline;
    return {
        loadData: function() {
            Exp = env.Exp,
            Newline = env.Newline;
        },
        is: function(previous) {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new ExpList();
            debug("ExpList: beginning search. env.index:" + env.index);
            var havePrevious = (typeof previous !== 'undefined');
            if(!havePrevious && !at(Exp)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.exps.push(havePrevious?previous:env.last);
            debug("ExpList: found Exp. env.index:" + env.index);
            var indexMid = env.index;
            at(Newline);
            while(at(',')) {
                if(!at(Exp)) {
                    env.index = indexBefore; 
                    env.inIndented = indentedBefore;
                    return false;
                }
                entity.exps.push(env.last);
                indexMid = env.index;
                at(Newline);
            }
            env.index = indexMid;
            env.last = entity.exps;
            return true;
        }
    };
};

var ExpList = function() {
    this.exps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "([";
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.exps[i].toString(indentlevel, indLvlHidden) + ",";
        }
        var removeCount = (this.furtherExps.length > 0?-1:0);
        out = out.substring(0, out.length+removeCount) + "])";
        return out;
    };
};