console.log('Starting up');


function init() {
  createProjects()
  renderPortfolio()
}

function renderPortfolio() {
  var projects = getProjects()
  var strHtmls = projects.map(function (project) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" onclick ="renderModal(${project.id})" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/${project.img}" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${project.name}</h4>
      <p class="text-muted">${project.title}</p>
    </div>
    </div>`
  })
  console.log(strHtmls.join())
  $('.portfolio-render').html(strHtmls.join(''))
}

function renderModal(projId) {
  var currProject = getProjectById(projId)
  var strHtml = `
    <h2>${currProject.name}</h2>
    <p class="item-intro text-muted">${currProject.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${currProject.img}" alt="">
    <p>${currProject.desc}</p>
    <ul class="list-inline">
      <li>Date: October 2018</li>
      <li><a href="${currProject.url}"><b>Link</b></a></li>
      <li>labels: ${currProject.labels}</li>
    </ul>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`
  $('.modal-body-1').html(strHtml)
}

function onSubmitEmail() {
  var $textarea = $('.contact-textarea').val()
  var $subject = $('.contact-subject').val()
  window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=wagner.amit@gmail.com&su=${$subject}&body=${$textarea}`
}
