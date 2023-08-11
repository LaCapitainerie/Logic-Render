class Constante{

    constructor(value){
        this.value = value;
    };

    get(){
        return this.value;
    };
};

class Incrementor{

    constructor(){
        this.value = 0;
    };

    get(){
        return this.value;
    };

    trigger(){
        return (++this.value);
    };

    untrigger(){
        return (--this.value);
    };

    reset(){
        this.value = 0;
        return 0;
    };


};

class Dictionnary{

    constructor(value){
        this.value = value;
    };

    get(index){
        return this.value[index];
    };

};