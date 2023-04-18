function checkRange(a,b,equation){
    let valid = false;

    switch (equation) {
        case "1":{
            if (((Math.pow(a,3) - a + 4)*(Math.pow(b,3) - b + 4))<0)
                return true;
        }
        case "2":{

        }
        case "3":{

        }

    }

    return valid;
}