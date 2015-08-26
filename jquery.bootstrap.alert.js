(function ($) {
    var defaultOptions = {
        type: "info",
        dismissable: true,
        floating: false,
        container: {
            position: "top|left",
            width: "20%"
        },
        dismiss_after: 0
    };

    function refactorMessage(message) {
        $("a", $(message)).each(function () {
            $(this).addClass("alert-link");
        });
        return message;
    }

    function createAlert(message, options) {
        var $alert = $("<div>")
			.addClass("alert")
			.addClass("alert-" + options.type)
			.attr("role", "alert")
			.html(refactorMessage(message));
        if (options.dismissable) {
            var $closeButton = $("<button>")
				.addClass("close")
				.attr("type", "button")
				.attr("data-dismiss", "alert")
				.attr("aria-label", "Close")
				.html("&times;");

            $alert.append($closeButton);
        }
        return $alert;
    }

    function getFloatingContainer(options) {
        var $container = $("#bsalert-floating-container");
        if ($container.length !== 0)
            return $container;
        $container = $("<div>")
			.attr("id", "bsalert-floating-container")
			.css({
			    width: options.width,
                position: "absolute"
            });
        var position = options.position.split("|");
        for (var i = 0; i < position.length; i++) {
            $container.css(position[i], "0px");
        }
        return $container;
    }

    $.fn.bsalert = function (message, config) {
        var options = {};
        $.extend(true, options, defaultOptions, config);

        var $alert = createAlert(message, options);

        var $container = $(this);

        if (options.floating) {
            $container = getFloatingContainer(options.container);
            $(this).append($container);
        }
        $alert.hide().fadeIn();
        if (options.position === "prepend")
            $container.prepend($alert);
        else
            $container.append($alert);

        if (options.dismiss_after !== 0) {
            window.setTimeout(function () {
                $alert.fadeOut(function () {
                    $(this).remove();
                });
            }, options.dismiss_after);
        }

        return this;
    };
})(jQuery);
