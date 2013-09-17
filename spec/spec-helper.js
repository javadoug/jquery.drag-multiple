beforeEach(function () {
    // jQuery hack
    // Trac 1.1.1dev @r11479 provides jQuery UI 1.8.21 and jQuery 1.8.2 
    // http://bugs.jquery.com/ticket/11921 
    if(!$.isFunction($.fn.curCSS)) {
        $.curCSS = $.css;
        $.fn.curCSS = $.fn.css;
    }

    this.addMatchers({

        toEqualHash: function (expected) {
            var i, failed;

            for (i in expected) {
                if (expected.hasOwnProperty(i) && !this.actual.hasOwnProperty(i)) {
                    failed = [i, expected[i]];
                    break;
                }
                if (expected[i] !== this.actual[i]) {
                    failed = [i, expected[i]]
                    break;
                }
            }

            if (undefined !== failed) {
                this.message = function () {
                    return 'Expected ' + jasmine.pp(this.actual) + (this.isNot ? " not " : "") + ' to equal ' + jasmine.pp(expected) + '.';
                }
                return false;
            }

            return true;

        },

        toInclude: function (expected) {
            var failed;

            for (var i in expected) {
                if (expected.hasOwnProperty(i) && !this.actual.hasOwnProperty(i)) {
                    failed = [i, expected[i]];
                    break;
                }
            }

            if (undefined !== failed) {
                this.message = 'Failed asserting that array includes element "' + failed[0] + ' => ' + failed[1] + '"';

                return false;
            }

            return true;
        },

        toIntersectWith: function (expected) {
            function pp(rect) {
                return "rect(" + (rect.start || {}).x + "," + (rect.start || {}).y + "," + (rect.stop || {}).x + "," + (rect.stop || {}).y + ")";
            }
            this.message = function () {
                return "Expected " + pp(this.actual) + (this.isNot ? " not " : "") + "to" + " intersect with " + pp(expected) + ".";
            }
            var result = this.actual.intersects(expected);
            if (result) {
                return true;
            }
            return false;
        }
    });
});