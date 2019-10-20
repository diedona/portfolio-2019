(function () {

    const content = {
        home: '',
        objetivos: '',
        skills: ''
    };

    $(function () {

        loadAllContent();

        const mainContent = $("#mainContent");
        mainContent.load('./partials/home.html', (html) => {
            content.home = html;
        });

        $(document).on('click', '#btnObjetivos', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.objetivos);
        });

        $(document).on('click', '#btnSkills', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.skills);
        });

        $(document).on('click', '.btn-go-home', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.home);
        });

    }); // jQuery

    function loadAllContent() {
        const objetivos = $('<div>');
        objetivos.load('./partials/objetivos.html', () => {
            content.objetivos = objetivos.html();
        });

        const skills = $('<div>');
        skills.load('./partials/skills.html', () => {
            content.skills = skills.html();
        });
    }

    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }

}());