// 1 of 13. In the past we used the var keyword for every variable. ES5

//For example 

var name = 'jade'; //Bad practice today!
name = 'bob';

console.log(name); // It wil work but 

// Now for ES6, we can use the let keyboard, which doesn't have the global scope 
// to avoid possible re assignations or unwanted assigns.

let anotherName = 'yeison';
anotherName = 'otherYeison';

console.log(anotherName);

//Also, if we don't want something to be re assigned. We can use const keyword.

const noAssignable = "inmutableName";

//noAssignable = "anotherName"; it will throw => error: TS2588 [ERROR]: Cannot assign to 'noAssignable' because it is a constant.

console.log(noAssignable)

// We have to take into account the properties of the objects can be re increased, avoiding the reference of the 
// original object.

const pokemon = {
    name:'Charizard'
}

// Now we want that that pokemon object has another property like power:32
// We can use object desctructuring, which is another es6 feature.

const evolvedCharizard = {
    ...pokemon,
    power:32
}

console.log(evolvedCharizard)

//Now another test to see the advantages of using let instead of var.

// Let's imagine we want to print every number of that array after 1 second.

for (var num of [1,2,3,4,5]) {
    setTimeout(function(){
        console.log(num)
    },1000);

    //Los bloques del setTimeout se llamaran luego dado que no bloquean el hilo principal de node al parecer.
}

// But what it's gonna happen here it's something curious.

// It will print 5 times 5. Why? The for loop will re assign the num until if finishes, and save that reference
// for when the time to call setTimeout has been called, so it will print the last iteration value every time.

// Another thing happens for let, becase let exit's only in the context from when it was defined.

for (let number of [1,2,3,4,5]){
    setTimeout(function(){
        console.log(number)
    },1000)
}

// This will print out 1,2,3,4,5 after 1 second as expected. Note: with const it will work too becase for every iteraion,
// the difference is that with const it will use a little more of resources.

// THe another difference is that we don't have a closure for that var num variable, becase outside of the scope
// of the loop, let and const don't exist.



// 2 of 13 => Arrow functions

//Normal function

function sum(x:number, y:number) {
    return x+y;
}


// Now we can use 

const sumArrow = (x:number,y:number)=> {
    return x+y;
};


// 3 of 12  Default parameters

function sumOptionNumbers(x=1,y=2) {
    return x+y
}

console.log(sumOptionNumbers())

// 4 of 12 Template literals

function templateLiterals(myVar:string){
    return `This is a text concatenation now ${myVar}`;
}

// 5 of 12 Spread operator

 //The spread operator can be used with arrays and objects.

 const myPokemon = {
     ...pokemon,
     anotherProperty:null,
     //here i can overrite properties from the object that we are destructuring
 }

 const array1 = [1,2,3];
 const array2 = [4,5,6];
 const arraySum  = [ ...array1, ...array2, 7, 8];

 // The difference at creating an object instead of using =, is that the new object is not referencing the original.
 // It's a total new object.

//  const sayHello = ({ nameVar timeVar }) => {
//      return `${nameVar} and ${timeVar}`
//  }

 //We can also add dynamic keys

 let people = {
     personDefault:"Yeison"
 }

 //Let's assume that we want to fill an object with the information in a for loop.

 for(let x = 0; x < 5; x++){
    people = {
        ...people,
        [`person_${x}`]:`Person number ${x}`
    }
 }

 console.log(people)

 // 6 of 12, Promises


const testPromise = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        //We are simulating async code here generally.
        resolve("This is coming from a promise")
    }, 1000);

    //Simulate error
    // If we uncoment the error, it gonna be called first, so resolve never gets called.
    //reject("Error in the API")
})

testPromise.then((promiseResponse)=> console.log(promiseResponse)).catch((error)=>console.log(error))

// 7 of 13 They are very usefull when callign to APIs

async function testApiCall() {
    
    const request = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    //Fetch has 2 main callbacks, first is to get the response and second is to get the json data, 
    //at least for this api.

    return await request.json();
    
}

//THe thing here is that fetch is a Promise, so we can accces with then concatenated into de function
// like this fetch('myUrl').then((json)=>console.log(json))

console.log(testApiCall().then((data)=>console.log(data)))

//Now we can write an async arrow function

const getFromApi = async () => {

    const string = await new Promise((resolve,reject)=> {
        //@ts-ignore 123
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json()).then(json => resolve(json.title))
        .catch(error => reject(error))
    })

    //Depeding if we are using fetch, maybe we need to convert response => response.json()
    // and then(json => resolve(json));
    console.log(string) //string will be filled with resolved or rejected value.
}

console.log(getFromApi())

// 8 of 12 Classes


// Before es6, everything was a prototype and constructors but now we have classes.

class Solution {

    name: string;

    constructor(name:string = 'Default from solution'){
        console.log("solution constructor called")
        this.name = name;
    }

    sayHello(){
        return `Hello ${this.name}`
    }

}


const mySolution = new Solution('Patterns');
console.log(mySolution)
console.log(mySolution.sayHello());

//Also with classes we can extend properties and methods from another classes

//Example


class SpecificSolution extends Solution {

    specificSolutionText:string;

    constructor(){
        super();
        this.specificSolutionText = 'default'
    }
}

console.log(new SpecificSolution)
// console.log(new SpecificSolution.sayHello()) Error becase we don't extend methods, only variables.


// 10 of 12 Modules

// We can export const, functions, classes and so on from a file and import them into another one.
// This is really cool becase we can do atomicity in our code an apply really solid principles

// We can import * como un objecto general sin darle nombre, llegara a reemplazar los metodos que ya existan.
// or we can use the 'as' keyword to transform the name.
// import * as settings from '../settings';

// 11 of 12 Object.values(myObject) and Object.entries(myObject)
 

const anotherPokemon = {
    power:12,
    name:'Charmander',
    type:'Fire',
    nextEvolution:'Charmileon'
}

console.log(Object.values(anotherPokemon)) //It will print of the values of the object 
console.log(Object.keys(anotherPokemon)) // Print the keys
console.log(Object.entries(anotherPokemon)) // Array of arrays with tuples with keys and values 
//Example
/* 
    [
        ["power",12],
        ["name","Charmander"],
        [......]
    ]
*/


// 12 of 12 padStart & padEnd

console.log('acb'.padStart(10,'XYZ')); //fill at the start of the string
console.log('acb'.padEnd(10,'X')); //fill at the end of the string




