(function () {

    let mainContent;

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
            mainContent.html(generateHtmlForGithub());
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

    function loadGithubRepos() {
        $.getJSON(githubData.url, (data) => {
            githubData.data = data;
        })
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

}());