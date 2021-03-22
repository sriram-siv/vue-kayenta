# Kayenta Vue Code Challenge

## App Function

This is a simple app for displaying a list of randomly generated users, with the ability to edit each record in-line.

Based off the tutorial by [Tania Rascia](https://www.taniarascia.com/getting-started-with-vue/)

## Process

I had previously attended a talk about Vue so was aware of the general layout and approach. I visited the Vue docs and read through the basics to familiarise myself with the syntax and then found Tania's tutorial, which looked like it had good scope for learning the main concepts.

I read through the source code and tutorial, then spun up a fresh vue app to build a copy from scratch. I wrote an outline of the features I was aiming to include:

* Pull random data from API
* Shape data using array methods
* Typeahead search
* Ordering data by clicking table headers

The version on the main branch is the result of a little over 3 hours work. I managed to make use of quite a lot of the Vue features that were described in the challenge spec, but the look and feel of the app was lacking at this stage. 

I added a bit of polish and refactored a fair bit after this commit, which you can see on the 'continued' branch. This version also has keyboard functionality for accessibility.

## Thoughts on Learning Vue

The biggest positive for me, coming from React, was the more traditional use of html / css / js. I've been a big fan of Styled Components, but writing scoped css for each component feels really clean. Directives like v-for, v-model, and v-bind are all satisfying to use and prevent the need for JS in the markup.

Trying to learn and apply everything in a few hours was a challenge thought. The biggest difficulty for me was context switching from React, especially in the case of handling events that communicate with the parent component.

Using Vuetify was a mixed bag - I think that it is a nice framework, but learning it at the same time as Vue tripped me up a bit. I had to make use of `!important` a couple of times, as I realised that my knowledge of Vuetify was lacking and needed a result in limited time.

I had the chance to use html tables properly for the first time and was pleasantly surprised. I had previously stuck to using flex/grid for table purposes but I'm realising now that this is a big problem for semantics. I also found a great article on CSS tricks that went into how to make tables responsive - I didn't implement this myself but am keen to give it a go and have another trick at my disposal.

Overall, it was pretty fun to get a look at Vue finally and I'm keen to dig in deeper.

