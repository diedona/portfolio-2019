(function () {

    const content = {
        home: '',
        objetivos: '',
        skills: '',
        contato: '',
        github: ''
    };

    let githubData = {
        url: 'https://api.github.com/users/diedona/repos?sort=created&direction=desc&page=1&per_page=10',
        data: [],
        html: ''
    };

    $(function () {

        loadAllContent();
        loadGithubRepos();
        avoidBackButton();

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

        $(document).on('click', '#btnContato', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.contato);
        });

        $(document).on('click', '#btnGithub', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(generateHtmlForGithub());
        });

        $(document).on('click', '.btn-go-home', function (evt) {
            evt.preventDefault();
            scrollToTop();
            mainContent.html(content.home);
        });

    }); // jQuery

    function scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }

    function loadGithubRepos() {
        $.getJSON(githubData.url, (data) => {
            githubData.data = data;
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

    function generateHtmlForGithub() {
        const page = $(content.github);
        console.log(page.html());
        let html = '';

        $.each(githubData.data, (idx, repo) => {
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
        return page.html();
    }

    function getBrDate(iso) {
        return moment(iso).format("DD/MM/YYYY HH:mm");
    }
    function avoidBackButton() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }

}());