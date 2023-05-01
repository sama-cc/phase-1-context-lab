const createEmployeeRecord = (array) => {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],    
        };
    return employeeRecord;
}

          
const createEmployeeRecords = (array) => array.map(employee => createEmployeeRecord(employee))
          
function createTimeInEvent (date) {
    let newArray = this.timeInEvents;
    newArray.push({
        type: "TimeIn",
        hour: parseInt(date.slice(11, date.length)),
        date: date.slice(0,10),
        })
    return this;
}
          
function createTimeOutEvent (date) {
    let newArray = this["timeOutEvents"];
    newArray.push({
        type: "TimeOut",
        hour: parseInt(date.slice(11, date.length)),
        date: date.slice(0,10),
        })
    return this;
}
          
function hoursWorkedOnDate (workDate) {
    let timeIn = this["timeInEvents"].find(date => date["date"] === workDate)["hour"];
    let timeOut = this["timeOutEvents"].find(date => date["date"] === workDate)["hour"];
    return (timeOut - timeIn)/100;
}
          
function wagesEarnedOnDate (date) {
    return hoursWorkedOnDate.call(this, date)*this["payPerHour"]
}

const findEmployeeByFirstName = (srcArray, firstName) => srcArray.find(employee => employee["firstName"] === firstName)
          
/* const allWagesFor = (obj) => {
    let dateArray = obj["timeInEvents"].map(workDate => workDate["date"]);
    let earnedArray = dateArray.map(date => wagesEarnedOnDate(obj, date));
    return earnedArray.reduce((accum, currentValue) => accum + currentValue);
} */
          
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll (array) {
    let payroll = array.map(employee => allWagesFor.call(employee));
    return payroll.reduce((accum, currentValue) => accum + currentValue);
}
