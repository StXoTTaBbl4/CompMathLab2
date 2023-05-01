function checkRange(a,b,equation){
    let valid = false;

    switch (equation) {
        case "1":{
            if (((Math.pow(a,3) - a + 4)*(Math.pow(b,3) - b + 4))<0)
                valid = true;
            break
        }
        case "2":{
            valid = true;
            break
        }
        case "3":{
            valid = true;
            break
        }
        case "4":{
            valid = true;
            break
        }

    }

    return valid;
}