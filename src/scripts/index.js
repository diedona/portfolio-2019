$(function () {

    const mainContent = $("#mainContent");
    mainContent.load('./partials/home.html');

    $(document).on('click', '#btnObjetivos', function (evt) {
        evt.preventDefault();
        mainContent.load('./partials/objetivos.html');
    });

    $(document).on('click', '.btn-go-home', function (evt) {
        evt.preventDefault();
        mainContent.load('./partials/home.html');
    });

});