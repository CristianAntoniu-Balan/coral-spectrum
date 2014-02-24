
jQuery(function($) {

    var newCard = 0;

    // Initialize grid & attach widget
    var $grid = $(".grid");
    $grid.cardView();
    $grid.on("change:selection", function(e) {
        var gl = e.widget;
        /*
        console.log(gl.getSelection());
        console.log(gl.getSelection(true));
        */
    });
    $grid.on("beforeselect", function(e) {
        if (e.item.$itemEl.hasClass("unselectable")) {
            e.cancelSelection(true);
        }
    });

    $grid.on("change:removeAll", function(e) {
        // console.log("All items removed");
    });

    $("#main-rail").on("open close", function() {
        CUI.CardView.get($grid).relayout();
    });

    $(".endor-BreadcrumbBar").fipo("tap", "click", function(e) {
        $(".endor-BreadcrumbBar").toggleClass("is-closed");
    });

    $(".endor-BlackBar-title").fipo("tap", "click", function(e) {
        $(".endor-BreadcrumbBar").toggleClass("is-closed");
    });

    $("#selection-mode").fipo("tap", "click", function(e) {
        // use API
        $grid.cardView("toggleGridSelectionMode");
        // use CSS contract
        // $grid.toggleClass("selection-mode");
        // $grid.find("article").removeClass("selected");
        // adjust button state
        if (CUI.CardView.get($grid).isGridSelectionMode()) {
            $("#selection-mode").removeClass("icon-check-circle");
            $("#selection-mode").addClass("icon-close-circle");
        } else {
            $("#selection-mode").addClass("icon-check-circle");
            $("#selection-mode").removeClass("icon-close-circle");
        }
    });

    $("#remove-all").fipo("tap", "click", function(e) {
        CUI.CardView.get($grid).removeAllItems();
    });

    function createNewCard() {
        return $("<article class=\"card-page\">" +
                "<i class=\"select\"></i>" +
                "<i class=\"move\"></i>" +
                "<a href=\"#\">" +
                    "<span class=\"image\"><img src=\"images/previews/preview1.png\" alt=\"\"></span>" +
                    "<div class=\"label\">" +
                        "<h4 class=\"main\">New Card #" + (++newCard) + "</h4>" +
                        "<div class=\"info\">" +
                            "<p class=\"published\"><i class=\"icon-globe\">Published</i> <span class=\"date\">12 hours ago</span> <span class=\"user\">Alison Parker</span></p>" +
                            "<p class=\"modified\"><i class=\"icon-edit\">Modified</i> <span class=\"date\">2 days ago</span> <span class=\"user\">John Doe</span></p>" +
                            "<p class=\"links\"><i class=\"icon-arrowright\">Link</i> <span class=\"links-number\">3</span></p>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
            "</article>");
    }

    $("#prepend").fipo("tap", "click", function(e) {
        // single item:
        var $itemEl = createNewCard();
        CUI.CardView.get($grid).prepend($itemEl);
        // multiple items:
        /*
        var $items = [
            createNewCard(), createNewCard(), createNewCard(),
            createNewCard(), createNewCard(), createNewCard()
        ];
        CUI.CardView.get($grid).prepend($items);
        */
        // multiple items at a deliberate position:
        // CUI.CardView.get($grid).getModel().insertItemAt($items, 2);
    });

    $("#append").fipo("tap", "click", function(e) {
        // single item:
        var $itemEl = createNewCard();
        CUI.CardView.get($grid).append($itemEl);
        // multiple items:
        /*
        var $items = [
            createNewCard(), createNewCard(), createNewCard(),
            createNewCard(), createNewCard(), createNewCard()
        ];
        CUI.CardView.get($grid).append($items);
        */
    });

    $("#display-mode").fipo("tap", "click", function(e) {
        var gl = CUI.CardView.get($grid);
        var dispMode = gl.getDisplayMode();
        switch (dispMode) {
            case CUI.CardView.DISPLAY_GRID:
                $("#display-mode").removeClass("icon-viewlist");
                $("#display-mode").addClass("icon-viewgrid");
                $("#selection-mode").hide();
                gl.setDisplayMode(CUI.CardView.DISPLAY_LIST);
                break;
            case CUI.CardView.DISPLAY_LIST:
                $("#display-mode").removeClass("icon-viewgrid");
                $("#display-mode").addClass("icon-viewlist");
                $("#selection-mode").show();
                gl.setDisplayMode(CUI.CardView.DISPLAY_GRID);
                break;
        }
    });

    $('.tagpicker').filters({
        multiple: true
    });

    // make rail pullable
    var rail = $('#main-rail'),
        railComponent = new CUI.Rail({
            element: rail
        });

    // closable rail
    $('#close-rail').fipo('tap', 'click', function () {
      // toggles the state of the .endor-BlackBar-nav button
      $('#close-rail').toggleClass('is-active');
      // closes the rail.
      railComponent._toggle();
      // toggles the state of the breadcrumb
      $(".endor-BreadcrumbBar").toggleClass('is-compact');
    });

    $('#close-light-rail').fipo('tap', 'click', function () {
        $("#light-rail").toggleClass('is-closed');
    });

    $("#references-first-type").fipo('tap', 'click', function () {
        toggleReferencesView();
    });

    rail.fipo('tap', 'click', '[data-view="references"] .back', function () {
        toggleReferencesView();
    });

    rail.fipo('tap', 'click', '.references .detail section', function (e) {
        var $section = $(this);

        var $actions = $section.find(".actions");
        if (!$actions.is(e.target) && !$.contains($actions[0], e.target)) {
            // Toggle actions status
            $actions.toggle();

            // Hide actions of siblings
            $section.siblings().find(".actions").hide();
        }

        e.preventDefault();
    });

    function toggleReferencesView() {
        var $references = rail.find(".references");
        $references.find(".list").toggle();
        $references.find(".detail").toggle();
        rail.find(".back").toggle();
    }

});
