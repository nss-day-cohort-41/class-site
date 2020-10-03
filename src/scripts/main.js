// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data.forEach(function (item) {
    let studentContact = `<div class="d-flex flex-column mt-auto"><div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != null) {

      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {

      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems d-flex flex-column">
          <img class="card-img-top" src="images/classmates/${item.proImg}" alt="${item.firstName} ${item.lastName}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body d-flex flex-column mh-100">
            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    if (item.reelThemIn != null) {
      studentInfo += `<p class="card-text">${item.reelThemIn}</p>`
    }
    studentInfo += studentContact

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if(item.bio != null){

    studentInfo += `
            <div class="mt-auto">
              <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
                Learn More!
                  </button>
              </center>
            </div>
          </div>
        </div>
      </div>`
    //modal info
    studentInfo +=`
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
           <h5 class="modal-title title-font" id="cohortMember${item.id}Label">${item.firstName} ${item.lastName}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <center><img src="images/classmates/${item.funImg}" alt="${item.firstName} ${item.lastName} fun"/></center><br>

            `

    studentInfo += studentContact


    studentInfo += `

    ${item.bio}
    </div>
    <center><button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" aria-label="Close">
      Back
              </button></center>

          </div >
        </div >
      </div > `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }
    document.getElementById("cohort").innerHTML += studentInfo;

  });
};


$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-2 technologies d-flex justify-content-around align-items-stretch align-self-center flex-wrap mb-1 mx-2">
          <a href="${item.link}" target="_blank">
            <img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}">
          </a>
      </div>`;
  });
};
