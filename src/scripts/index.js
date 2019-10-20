(function () {

    const content = {
        home: '',
        objetivos: ''
    };

    $(function () {

        loadAllContent();

        const mainContent = $("#mainContent");
        mainContent.load('./partials/home.html', (html) => {
            content.home = html;
        });

        $(document).on('click', '#btnObjetivos', function (evt) {
            evt.preventDefault();
            mainContent.html(content.objetivos);
            scrollToTop();
        });

        $(document).on('click', '.btn-go-home', function (evt) {
            evt.preventDefault();
            mainContent.html(content.home);
            scrollToTop();
        });

    }); // jQuery

    function loadAllContent() {
        const objetivos = $('<div>');
        objetivos.load('./partials/objetivos.html', () => {
            content.objetivos = objetivos.html();
        });
    }

    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

}());