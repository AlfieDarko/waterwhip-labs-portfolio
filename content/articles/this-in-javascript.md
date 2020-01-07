---
date: "2019-10-28"
slug: frontendsessions-storybook-js
path: "/articles/this-in-javascript"
title: "Javascript's 'this' keyword"
---

# #FrontEndSessions: Javascript’s ‘this’ keyword

![](https://miro.medium.com/max/806/1*ZhsavzBRLDFkgu1fYawVEw.png)

If you have read anything about Javascript’s `this` keyword, you should know that for someone new to the concept, it can get very confusing, very quickly.

In many cases it’s somewhat simple to find out what `this` is in reference to certainly not all the time, especially to new developers.

I will be going through some scenarios to demystify the `this` keyword.

I’m assuming basic knowledge of things like context and scope ([Check this short read about it](https://blog.kevinchisholm.com/javascript/difference-between-scope-and-context/)) but with basic javascript coding knowledge, hopefully the code examples are relatively simple enough to illustrate what’s happening.

# **Implicit Binding**

(_aka whatever is before the _`.`)

In many instances, `this` is whatever it is implied to be. It is probably the most common way you will see it used.

Lets look at the example below.

```js
const user = {
  name: ‘Alfonzo’,
   greet() {
      console.log(`Hello, this is ${this.name}`)
   }
}

user.greet() // "Hello, this is Alfonzo"
```

The function would log `Hello, this is Alfonzo` to the console.

In regards to the `this`keyword, to find what it’s referring to in this circumstance, it look’s around at what & where it is being called. (_Try to think about where it’s being executed & not where its defined!_).

So lets look at where the `greet()` method is executed.
You should find `greet()` is executed from the `user` object. This ties the `this` keyword to the user object in this example.

_(We are implying that _`this`_ is binded to user object as its the one making the execution.)_

**So one of the ways to find out what **`this`** refers to is to simply look at whatever object the invocation belongs to.**

# **Explicit Binding**

You can explicitly bind the context `this` refers to. Meaning you can explicitly set what the `this` keyword is referring to.

Lets take a look at the code below

```js
const showMyAddress = () => {
  console.log(`You live at ${this.street}`);
};

const address = {
  street: "7 Crooklyn Ave",
  postCode: "E7 3AH"
};

showMyAddress(); // "You live at undefined"
```

If we look try and follow the implicit binding rule, `showMyAddress()` isn’t being executed by an object that we can see. It’s being executed on the global environment!

The global environment is an object just incase you didn’t know!
Since there is no street property on the global, `showMyAddress()`would return `“You live at undefined”`.

Wouldn’t it be great if we could somehow make this refer to whatever we wanted it? We could make this refer to the `address` object.

**Luckily for us, all Javascript functions have 3 inbuilt methods that can help us with this. **Even though the object and function are’nt connected in any way!

Lets take a look at what each one does…

## Call()

_(Calls a function with the context of another object)._

Take a look at the code below…

```js
const showDebt = () => {
  console.log(`You live at ${this.street} & you owe £1000`);
};

const address = {
  street: "7 Crooklyn Ave",
  postCode: "E7 3AH"
};

showDebt.call(address); // You live at 7 Crooklyn Ave & you owe £1000.
```

`showDebt.call(address)` will now log the string:

```
You live at 7 Crooklyn Ave & you owe £1000.
```

This calls the `showDebt` function and sets the context of `this` to the 1st object passed in. So now our `this` keyword in the `showDebt()` function is referring to context of the `address` object

Any other values passed in as values after the 1st parameter will act just as normal values that get passed into a function.

## **Apply()**

`apply()` does the exact same thing as `call()` but instead you can pass additional arguments as an array instead of passing them in one by one.

```js
const showDebt = (amount, debtor) => {
  console.log(
    `You live at ${this.street}, you owe ${amount} to       ${debtor}`
  );
};

const address = {
  street: "7 Crooklyn Ave",
  postCode: "E7 3AH"
};

const detailsArray = ["£1,000,000", "Barclays Bank PLC"];

showDebt.apply(address, detailsArray);
```

`showDebt.apply(address, detailsArray)`will log the string:
`You live at 7 Crooklyn Ave, you owe £1,000,000 to Barclays Bank PLC`

## Bind()

`bind()` acts the same as call but this time it returns a function that we can execute, binded to whatever was passed in. So for example…

```js
const showDebt = (amount, debtor) => {
  console.log(
    `You live at ${this.street}, you owe ${amount} to       ${debtor}`
  );
};

const address = {
  street: "7 Crooklyn Ave",
  postCode: "E7 3AH"
};

let result = showDebt.bind(address, "£1,000,000", "Barclays Bank PLC");

result();
```

Guess what invoking `result()` will return?
`You live at 7 Crooklyn Ave, you owe £1,000,000 to Barclays Bank PLC`

# New Binding

Another rule that sets the `this` reference.

Whenever you invoke a function with the new keyword before it, it retuns a new object with all its properties.

The new object that is constructed has a `this` too.

The context of the function that the `new` keyword was used on also returns its `this` context to the newly created object.

```js
const thisCarDetails = () => {
  console.log(`${this.name} is a ${this.colour} car`);
};

const sportsCar = (name, colour) => {
  this.name = name;
  this.colour = colour;
  this.showDetails = thisCarDetails;
};

const blackCar = new sportsCar("kit", "black");
const yellowCar = new sportsCar("bumblebee", "yellow");

blackCar.showDetails(); // "kit is a black car"
yellowCar.showDetails(); // "bumblebee is a yellow car"
```

For further reading, check the articles below in the further reading section about the new keyword.

# Lexical Binding

Let’s look at some instances of nested functions where the `this` reference isn’t always easy to decipher…

## Example #1

```js
const person = {
  name: "Alfonzo",
  cars: ["Mercedes", "BMW"],
  bragAboutCars: function() {
    console.log(`${this.name} owns ${this.cars}`);
  }
};

person.bragAboutCars(); // "Alfonzo owns Mercedes, BMW"
```

`this` looks at what object the function is called from, which is the person object. So `this` is simply set to the what object calls the `bragAboutCars()` function.

## Example #2

```js
const person = {
  name: "Alfonzo",
  cars: ["Mercedes", "BMW"],
  bragAboutCars: function() {
    this.cars.forEach(function(car) {
      console.log(`${this.name} owns ${car}`);
    });
  }
};

person.bragAboutCars(); // "undefined owns Mercedes"// "undefined owns BMW"
```

So `person.bragAboutCars()` returns

```
"undefined owns Mercedes""undefined owns BMW"
```

`this` in the example above doesn’t seem to refer to the context we expect it to. Why is this?

**Javascript has wierd parts**. `this` loses contexts in callback functions (as this isn’t really a variable, it’s a keyword that refers to a context)

![](https://miro.medium.com/max/920/1*BAX_De3pdjj_nmV_CvuEag.png)

Not to worry, there are a few ways to circumvent this behaviour.

## Circumvention #1

```js
const person = {
  name: "Alfonzo",
  cars: ["Mercedes", "BMW"],
  bragAboutCars: function() {
    this.cars.forEach(function(car) {
      console.log(`${this.name} owns ${car}`);
    }, person); // Passing person as an argument in the callback
  }
};
person.bragAboutCars(); // "Alfonzo owns Mercedes"// "Alfonzo owns BMW"
```

In array methods that take a callback (_map, reduce, filter, foreach_ etc.), we can circumvent the behaviour displayed in **Example #2** by passing the object you would like `this` to refer to in as the 2nd argument.

## Circumvention #2

```js
const person = {
  name: 'Alfonzo',
  cars: ['Mercedes', 'BMW'],
  bragAboutCars: function() {
    let that = this;
    this.cars.forEach(function(car) => {
      console.log(`${that.name} owns ${car}`)
    })
  }
}

person.bragAboutCars()// Alfonzo owns Mercedes// Alfonzo owns BMW
```

Another way that you can circumvent the wierd this behaviour is by using the ‘**that = this’ pattern **as illustrated above. Since `this` is not a variable, it doesn’t obey the normal variable scope rules.

We have to use a variable (in this eg. `that` ) references the `this` in order to have it obey the lexical scope rules.

This allows us to re-set `this` to the context that we want it to refer to.

This example can be used with any type of method, doesn’t have to be an array method like the previous example

## Circumvention #3

```js
const person = {
  name: "Alfonzo",
  cars: ["Mercedes", "BMW"],
  bragAboutCars: function() {
    this.cars.forEach(car => {
      console.log(`${this.name} owns ${car}`);
    });
  }
};

person.bragAboutCars(); // Alfonzo owns Mercedes// Alfonzo owns BMW
```

The difference between the above and the previous example is that we are now using an arrow function in the `forEach` function.

The important difference? **Arrow functions dont bind the **`this`**keyword, so they do not have their own this context!** So what`this`refers to will always fall back to the value that it would have referred to outside of the arrow function. No more context stealing!

**So now we have no need to do the **`that = this`** thing.**

# Window Binding

This is talking about what the `this` keyword will bind to by default if there is no context.
In browsers it is the window object, in node it is the global object.

```js
a = 37;
console.log(window.a); // 37
```

Try running `console.log(this === window)` in your command line. It should return true!

```js
a = 1000;
this.a = 1001;
console.log(window.a); // 1001
```

The above example illustrates that `this.a` & `a` are refering to the same property on the window object. So console.logging `window.a` will return 1001.

## **Further Reading:**

Call, Apply Bind — [https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/](https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/)

`new` keyword — [https://hackernoon.com/understanding-javascript-new-keyword-ec67c8caaa74](https://hackernoon.com/understanding-javascript-new-keyword-ec67c8caaa74)

`this` keyword — [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Hopefully I was able to illustrate how to find out what `this` is reffering to in different scenarios. It can be abit confusing at first but I suggest messing around with the code examples in your devtools environment. Experimentation is one of the best ways of learning!

Thanks for reading!
