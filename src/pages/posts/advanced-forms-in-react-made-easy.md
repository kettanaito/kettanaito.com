---
date: '2018-05-14'
category: OSS
title: Advanced forms in React made easy.
description: Learn how to create clean and performant forms using React Advanced Form package.
thumbnail: https://cdn-images-1.medium.com/max/2000/1*2ab2nCOuM6WVH3xC0WJg9g.png
keywords: react, form, react advanced form, multi-layer validation, resolver
---

## Foreword

Form is one of the most important interaction elements on the website. It’s easy to create a simple form. It’s hard to create a real-world form. For more than two years my team and I have been working on a huge e-commerce solution, and for more than two years we have struggled to fit the requirements into the form library we have chosen at the very beginning.

Refactoring was out of question. To our deepest surprise each of the modern solutions felt like walking into the same water. Instead, we have decided to create the one that would suit our needs foremost, eliminating present issues and focusing on missing functionality.

Today I am glad to share with you the outcome and demonstrate how it helped us to make the implementation cleaner and more maintainable.

---

## The problems

Each of the points below can be dealt with to a certain extent. My emphasis here is that those can rather be handled on a form’s level, dramatically improving developer’s experience.

### Boilerplate

Our team hates writing boilerplate, so we couldn’t tolerate with providing blocks of configuration to high-order components around each form, or obscurely defining which fields a form will have before it renders.

Of course, you can abstract. Especially when you wish to end up in the hell of non-maintainable abstractions. The bottom line is, if a third-party solution results into you creating abstractions over it, then, probably, it never solved your problems in the first place.

### Obscure declaration

Back in the day we needed to create an array of strings, which would represent the fields, and pass it to the high-order component before the form is even mounted. Today I see fields declared as Objects, or even worse, proving that this point is as valid as never.

Declaration of a form and its fields must be simple. I cannot stress more on how devastating an obscure declaration is to the code you write.

### Responsibility delegation

Form libraries tend to ask a developer to manage so many things that the one forgets about using a library at all. Maintaining and updating fields’ state, writing repetitive “validate” functions, or manually handling submit statuses — don’t be fooled to believe managing all this is your responsibility.

I value a solution being dynamic and flexible, but there is a fine line between being in control whenever you need to, and being forced to manage things when you shouldn’t.

---

## Getting started

That being said, it’s time to offer some solutions to those problems.

You and me are going to have a pair programming session right now, implementing a real-world registration form in our application. This is not going to be a short session, but, hopefully, a noteworthy one.

## Declaration

A lot of solutions overcomplicate even at this starting point, but we are going to keep things simple. Clarity on the declaration level is a must and is an unrivaled privilege when working with a big code base.

Declaring the form’s layout must be simple: