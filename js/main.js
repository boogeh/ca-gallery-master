console.log('Starting up');


function init() {
    createProjects()
    renderPortfolio()
}

function renderPortfolio() {
  var projects = getProjects()
  var strHtmls = projects.map(function(project) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" onclick ="renderModal(${project.id})" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="${project.img}" alt="">
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
    <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
    <p>${currProject.desc}</p>
    <ul class="list-inline">
      <li>Date: October 2018</li>
      <li>gitHub link: ${currProject.url}</li>
      <li>labels: ${currProject.labels}</li>
    </ul>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>`
    var $innerHtml = $('.modal-body-1').html(strHtml)
}



/* <div class="modal-body">
<!-- Project Details Go Here -->
<h2>Testing</h2>
<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
<img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
  dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
<ul class="list-inline">
  <li>Date: January 2017</li>
  <li>Client: Threads</li>
  <li>Category: Illustration</li>
</ul>
<button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project</button>
</div> */