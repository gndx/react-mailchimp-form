# react-mailchimp-form
It provides an easy-to configure component to add a mailchimp form to your react project

# Install 

```npm
npm install react-mailchimp-form
```

Be sure to include the --save option to add this as a dependency in your application's package.json

# Usage 

First you have to configure your Mailchimp account:

1. Create a new account or use an existing one
2. Add a new list or use an existing one
3. Personalize the fields on your list on "Settings > List Fieds"
4. Copy the HTML and extract the action from "Signup Forms > Embedded forms"

The action URL will look like this:
```
https://<YOUR-USER>.us16.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX
```
We will use this URL to configure the component


```js
import React, { Component } from 'react';
// import the component
import Mailchimp from 'react-mailchimp-form'

class App extends Component {
  render() {
    return (
        <Mailchimp
        action='https://<YOUR-USER>.us16.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX'
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          }
        ]}
        />
    );
  }
}

export default App;
```

# Options

### Multiple fields
You can add all the fields you need for your Mailchimp form, just remember you have to configure them on "Settings > List Fields"

### Messages
Personalize or change the message language by default

### ClassName
Add a personalized class to personalize your form

```js
  <Mailchimp
  action='https://<YOUR-USER>.us16.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX' 
  
  //Adding multiple fields:
  fields={[
    {
      name: 'EMAIL',
      placeholder: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'FNAME',
      placeholder: 'name',
      type: 'text',
      required: true
    }
  ]}
  // Change predetermined language
  messages = {
    {
      sending: "Sending...",
      success: "Thank you for subscribing!",
      error: "An unexpected internal error has occurred.",
      empty: "You must write an e-mail.",
      duplicate: "Too many subscribe attempts for this email address",
      button: "Subscribe!"
    }
  }
  // Add a personalized class
  className='<YOUR_CLASSNAME>'
  />

```

# Demo
Check here: [react-mailchimp-form](https://arepa-dev.github.io/reactMailchimp/)

# Contributing
If someone wants to add or improve something, I invite you to collaborate directly in this repository: [react-mailchimp-form](https://github.com/gndx/react-mailchimp-form/)

# License
React-mailchimp-form is released under the [MIT License](https://opensource.org/licenses/MIT).
