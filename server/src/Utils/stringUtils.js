export const baseConverter = (data, base) => {
    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
        
    const base16to10 = function (num) {
        return ConvertBase(num).from(16).to(10);
    };

    const base10to16 = function (num) {
        return ConvertBase(num).from(10).to(16);
    };

    const base10to62 = function(num) {
    
        if(num === 0) return '0';
        
        var hexMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var hex = '';
        if(num > 0 ) {
            while(num !== 0) {
             hex = hexMap[num % 62] + hex;
             num = parseInt(num/62);
         }
        } else {
            hex = base10to62(0xffffffff - Math.abs(num) + 1);
        }
        return hex;
    };

    return {
        base10to62,
        base10to16,
        base16to10
    }
}