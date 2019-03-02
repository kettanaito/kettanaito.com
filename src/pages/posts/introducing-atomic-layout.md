---
date: '2019-03-01'
category: OSS
title: Introducing Atomic layout
description: It's time we pay more attention to spacial distrubution in our layouts. Not only it would make a layout more flexible, but it would dramatically improve its readability and maintainability.
thumbnail: https://images.unsplash.com/photo-1550956213-57f7d80854ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
---

Think of how you create layouts today. Most likely, you're following a system. It's common to have a set of reusable components (atoms) which combine into functional composites (molecules, organisms, pages). This pattern benefits greatly when designing solutions of any scale.

Yes, I am talking about Atomic design-a methodology that shaped the way designers and developers envision interfaces. Although that is a remarkable approach to follow, there is a certain problem developers often face when it comes to the implementation.

---

## Getting started

### Installation

```bash
npm install atomic-layout
```

> Requires `react` and `styled-components` as peer dependencies.

### Develop

```jsx
<Composition template="header sidebar">
  {({ Header, Sibedar }) => (
    <>
      <Header>Header</Header>
      <Sidebar>Sidebar</Sidebar>
    </>
  )}
</Composition>
```

---

## Resources

- [**Documentation**](https://redd.gitbook.io/atomic-layout)
- ["Future of Layouts" by Artem Zakhachenko, React Vienna](https://www.youtube.com/watch?v=x_93DjN_bUA)
  <!-- - [Full-page example (ZEIT)](#) -->
