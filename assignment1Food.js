const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    SECOND_ITEM: Symbol("second-item"),
    SECOND_ITEM_SIZE: Symbol("second_item_size"),
    SECOND_ITEM_TOPPINGS: Symbol("second_item_toppings"),
    DRINKS:  Symbol("drinks"),
    DESSERT: Symbol("dessert")
});

module.exports = class FoodOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sItem = "Shawarama";
        this.sSecond_item_size="";
        this.sSecond_item_toppings="";
        this.sItem_second ="";
        this.sDrinks = "";
        this.sDessert = "";
        this.sTotal_cost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Farhana's Shawarma Kitchen!");
                aReturn.push("What size of shawarma would you like: large / medium / small?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS;
                this.sSize = sInput;
                if(this.sSize=="large"){
                    this.sTotal_cost=this.sTotal_cost +15;
                }
                else if(this.sSize=="medium"){
                    this.sTotal_cost=this.sTotal_cost +11;
                }
                else if (this.sSize=="small"){
                    this.sTotal_cost=this.sTotal_cost +8;
                }
                else{
                    aReturn.push("What size of shawarma would you like: large / medium / small?");  
                    this.stateCur = OrderState.SIZE;
                    break;
                }
                aReturn.push("What toppings would you like?");
                console.log(this.sTotal_cost);
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SECOND_ITEM;
                this.sToppings = sInput;
                aReturn.push("Would you like to try french fries / falafel / salad as a second item? We offer flat rates for these items but prices differ on sizes!");
                break;  
            case OrderState.SECOND_ITEM:
                this.stateCur = OrderState.SECOND_ITEM_SIZE;
                if(sInput.toLowerCase()!= "no"){
                    this.sItem_second = sInput;
                }
                aReturn.push(`What size would you like for your ${this.sItem_second}: large / medium / small?`);
                break;              
            case OrderState.SECOND_ITEM_SIZE:
                this.stateCur = OrderState.SECOND_ITEM_TOPPINGS;
                this.sSecond_item_size = sInput;

                if(this.sSecond_item_size=="large"){
                    this.sTotal_cost=this.sTotal_cost +10;
                }
                else if(this.sSecond_item_size=="medium"){
                    this.sTotal_cost=this.sTotal_cost +7;
                }
                else if (this.sSecond_item_size=="small"){
                    this.sTotal_cost=this.sTotal_cost +5;
                }
                else{
                    aReturn.push(`What size would you like for your ${this.sItem_second}: large / medium / small?`);
                    this.stateCur = OrderState.SECOND_ITEM_SIZE;
                break;              
                }
                aReturn.push(`What toppings would you like in your ${this.sItem_second}?`);
                console.log(this.sTotal_cost);
                break;
            case OrderState.SECOND_ITEM_TOPPINGS:
                this.stateCur = OrderState.DRINKS;
                this.sSecond_item_toppings = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.DESSERT;
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.sTotal_cost=this.sTotal_cost +1.5;
                }
                aReturn.push("Would you like something for dessert?");
                console.log(this.sTotal_cost);
                break;
            case OrderState.DESSERT:
                this.isDone(true);
                if(sInput.toLowerCase != "no"){
                    this.sDessert = sInput;
                    this.sTotal_cost=this.sTotal_cost +3;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} ; ${this.sSecond_item_size} ${this.sItem_second} with ${this.sSecond_item_toppings}`);
                if(this.sDrinks){
                    aReturn.push(`with a drink of ${this.sDrinks}`);
                }
                if(this.sDessert){
                    aReturn.push(`and a dessert of ${this.sDessert}`);
                }
                aReturn.push("Your total bill amount is:");
                aReturn.push(`$${this.sTotal_cost}`);
                console.log(this.sTotal_cost);

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;   
        }
        return aReturn;
    }
}