console.log('Starting up');


function init() {
    createProjects()
}

function renderModal(projectClicked) {
    console.log(projectClicked)
    var strHtml = `
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