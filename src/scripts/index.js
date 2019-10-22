(function () {

    let mainContent;

    const content = {
        home: '',
        objetivos: '',
        skills: '',
        contato: '',
        github: ''
    };

    let gitSettings = {
        url: 'https://portfolio-diedona.azurewebsites.net/api/GetGitRepos?code=L/aNxYb3dzCvbAH8zKqu2xI9SawDdCvO8VcPbbYyE2atwLclss539g==',
        data: []
    };

    $(function () {

        loadAllContent();
        handlePopState();

        mainContent = $("#mainContent");
        mainContent.load('./partials/home.html', (html) => {
            content.home = html;
        });

        $(document).on('click', '#btnObjetivos', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.objetivos);
            window.history.pushState(null, "objetivos", null);
        });

        $(document).on('click', '#btnSkills', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.skills);
            window.history.pushState(null, "skills", null);
        });

        $(document).on('click', '#btnContato', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.contato);
            window.history.pushState(null, "contato", null);
        });

        $(document).on('click', '#btnGithub', function (evt) {
            evt.preventDefault();
            scrollToTop();
            loadRepositoriesShowHTML();
            window.history.pushState(null, "github", null);
        });

        $(document).on('click', '.btn-go-home', function (evt) {
            evt.preventDefault();
            history.back()
        });

    }); // jQuery

    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }

    function goHome() {
        scrollToTop();
        mainContent.html(content.home);
    }

    function handlePopState() {
        $(window).on('popstate', function (e) {
            goHome();
        })
    }

    function loadAllContent() {
        const objetivos = $('<div>');
        objetivos.load('./partials/objetivos.html', () => {
            content.objetivos = objetivos.html();
        });

        const skills = $('<div>');
        skills.load('./partials/skills.html', () => {
            content.skills = skills.html();
        });

        const contato = $('<div>');
        contato.load('./partials/contato.html', () => {
            content.contato = contato.html();
        });

        const github = $('<div>');
        github.load('./partials/github.html', () => {
            content.github = github.html();
        });
    }

    function loadRepositoriesShowHTML() {
        if (gitSettings.data.length === 0) {
            showHideLoading(true);
            $.getJSON(gitSettings.url, (data) => {
                gitSettings.data = data;
                mountAllHtml();
                showHideLoading(false);
            })
        } else {
            showHtml();
        }
    }

    function showHtml() {
        mainContent.html(content.github);
    }

    function mountAllHtml() {
        const page = $(content.github);
        let html = '';

        $.each(gitSettings.data, (idx, repo) => {
            html += `
                <div class='col-md-4 mb-3'>
                    <div class="card card-repo shadow-sm">
                        <div class="card-body">
                            <strong>${repo.name}</strong> 
                            <br />
                            Criado em ${getBrDate(repo.created_at)}
                            <br />
                            <a href="${repo.html_url}" target="_blank">Ir para página</a>
                        </div>
                    </div>
                </div>
            `
        });

        $('#gitHubRepos', page).html(html);
        content.github = page.html();
        mainContent.html(content.github);
    }

    function getBrDate(iso) {
        return moment(iso).format("DD/MM/YYYY HH:mm");
    }

    function showHideLoading(show) {
        if (show) {
            $(".loading-modal").show();
        } else {
            $(".loading-modal").hide();
        }
    }

}());