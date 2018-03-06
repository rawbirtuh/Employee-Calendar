function User(fName, lName){

  console.log("User was created!");
  this.firstName = fName;
  this.lastName = lName;
  this.news = [];
  this.shifts = [];
  this.requestList = [];

  this.getShiftList = function(){
    console.log(mergeSort(this.shifts));
  };

  this.getNews = function(){
    console.log("Your news are:\n" + news);
  };

  this.seeRequests = function(){
    requestList.forEach(function(eachRequest){
      console.log("Your co-worker " + eachRequest.coWorker.firstName + " " + eachRequest.coWorker.lastName + " wants to switch their " + eachRequest.switchShift.shiftTime + "for your " + eachRequest.yourShift.shiftTime + ".");
    });
  };
  //makes a request and sends it to the request list of the userAccepting
  this.switch = function(userRequesting, userAccepting, shiftForAccepting, shiftForRequesting){
    //check if the shift for the requesting person exists in his own shifts
    userRequesting.shifts.forEach(function(userRShifts){
      if(userRShifts === shiftForAccepting){
        //the shift of requesting is foudn in his own shifts
        //check the shifts of the accepting for the shift requested (that shift's name is shiftForRequesting)
        userAccepting.shifts.forEach(function(userAShifts){
          if(userAShifts === shiftForRequesting){
            //then you can make and send a request since the two shifts exist in their respective shifts lists.
            //shiftForAccepting is the shift given to userAccepting shiftForAccepting(userAccepting) <-> shiftForRequesting(userRequesting)
            var theRequest = new SwitchRequest(userRequesting, userAccepting, shiftForAccepting, shiftForRequesting);
            userAccepting.requestList.push(theRequest);
          }
        });
        console.log("The user accepting does not have the shift the requesting user wants");
      }
    });
    console.log("The user requesting does not have the shift they specified");
  };

  this.accept = function(request){
    console.log(request);
    request.userRequesting.shifts.forEach(function(userRShifts){
      //del userRshifts if
      if(userRShifts === request.acceptingShift){
        //add the shfit found in userRequesting to userAccepting's shifts
        userRShifts.employee = request.userAccepting;
        request.userAccepting.shifts.push(userRShifts);
        //remove from userRequesting, the shift found in userRequesting that was given to userAccepting
        var indexRequesting = request.userRequesting.shifts.indexOf(userRShifts);
        //console.log(index);
        //console.log(request.userRequesting.shifts[0]);
        //console.log("The shifts of the user requesting are:")
        //console.log(request.userRequesting.shifts);
        request.userAccepting.shifts.forEach(function(userAShifts){
          if(userAShifts === request.requestingShift){
            //give userRequesting the shift found in userAccepting
            userAShifts.employee = request.userRequesting;
            request.userRequesting.shifts.push(userAShifts);
            //remove the shift found in userAccepting
            indexAccepting = request.userAccepting.shifts.indexOf(userAShifts);
            //console.log(index);
            request.userRequesting.shifts.splice(indexRequesting, 1);
            request.userAccepting.shifts.splice(indexAccepting, 1);


            //console.log("The shifts of the user accepting are:")
            //  console.log(request.userAccepting.shifts);
          }
        });
      }
    });
  }
}//end User

function Shift(employee, shift, job){
  this.employee = employee;
  this.shiftTime = shift;
  this.job = job;
}//end Shift

//The request object with pointers to the shifts in user shifts.
function SwitchRequest(userRequesting, userAccepting, acceptingShift, requestingShift){
  //the user requesting
  this.userRequesting = userRequesting;
  //the user accepting
  this.userAccepting = userAccepting
  //the shift given to userAccepting
  this.acceptingShift = acceptingShift;
  //the shift given to userRequesting
  this.requestingShift = requestingShift;
}//end SwitchRequest

//Shifts are made by admin(or the computer in better versions), and assigned to Users
function admin(password){
  this.userList = [];
  this.shiftList = [];

  this.showUserList = function(){
    console.log(this.userList);
  };

  this.update = function(){
    this.userList.forEach(function(users){
      users.shiftList.forEach(function(userShift){
        this.shiftList.push(userShift);
      });
    });
    console.log("Update Completed!");
  };
  this.addShift = function(user, job, year, month, days, hours, minutes){
    this.userList.forEach(function(eachUser){
      if(user === eachUser){
        if ((typeof year==='number' && (year%1)===0) && (typeof month==='number' && (month%1)===0) && (typeof days==='number' && (days%1)===0) && (typeof hours==='number' && (hours%1)===0) &&
      (typeof minutes==='number' && (minutes%1)===0)){
          var shiftDate = new Date(year, month, days, hours, minutes,0,0);
          var newShift = new Shift(user, shiftDate, job);
          user.shifts.push(newShift);
          console.log("All's well.");
          return "All's well";
        }
        else{
          console.log("One of the bits of input is not a number.");
          return "All's well";
        }
      }
    });
  };

  this.addUser = function(firstName, lastName){
    var newUser = new User(firstName, lastName);
    this.userList.push(newUser);
  };

  this.changeShiftTime = function(shift, newTime){
    shift.ShiftTime = newTime; //change shiftTime attribute a Date type
  };

  this.changeShiftUser = function(shift, newUser){
    shift.employee = newUser; //change employee attribute a User type
  };

  this.seeShifts = function(){
    console.log(mergeSort(this.shiftList));
  };
}

function mergeSort (arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr;
  }
  const middle = Math.floor(arr.length / 2);// get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side

  return merge(mergeSort(left),  mergeSort(right));
}

  // compare the arrays item by item and return the concatenated result
function merge (left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

var admin = new admin("ok");
admin.addUser("Boogie", "Macklemore"); //this is userlist[0]
admin.addUser("Kahoot", "Gondola"); //userlist[1]
//admin.showUserList();

admin.addShift(admin.userList[0], "Sales", 1997,10,10,4,30);
admin.addShift(admin.userList[1], "Bullshit", 2000,10,10,4,30);
console.log(admin.userList[1].shifts);
//console.log(admin.userList[0].shifts);
//console.log(admin.userList[1].shifts);
//console.log(admin.userList[0].shifts);
admin.userList[0].switch(admin.userList[0], admin.userList[1], admin.userList[0].shifts[0], admin.userList[1].shifts[0]); //boogie to kahoot
admin.userList[1].accept(admin.userList[1].requestList[0]);
console.log(admin.userList[0].shifts);
console.log(admin.userList[1].shifts);

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
//console.log(admin.userList[0].shifts);
//console.log(admin.userList[1].shifts);
