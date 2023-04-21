onmessage = function (e) {
    let result = "";
    let number = parseInt(e.data.input);
    let i = 2;
    if (number == 1) {
        result = "false";
    }
    if (number == 2) {
        result = "true";
    }
    for (i < number; i++;) {
        if (number % i == 0) {
            result = "false";
            break;
        } else {
            result = "true";
        }
    }

}
