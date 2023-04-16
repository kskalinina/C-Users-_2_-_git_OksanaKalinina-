const formattedMSToDateString = (ms, format = 'en-US') =>  {
    const tempDate = new Date();
    tempDate.setTime(timeMS)
    return new Intl.DateTimeFormat('en-US').format(tempDate)
};
export {formattedMSToDateString}