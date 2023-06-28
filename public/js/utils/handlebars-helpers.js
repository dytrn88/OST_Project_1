debugger;
Handlebars.registerHelper('formatDate', function (date) {
    debugger;
    const dateObj = new Date(date);
    const formattedDate = dateObj.toISOString().split('T')[0];
    return formattedDate;
});