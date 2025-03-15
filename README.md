# ValidatorJS

## Installation and Usage

#### HTML

```html
<form>
  <input id="name" type="text" />
</form>
```

#### JS

```js
import { validate } from "@xqdt/validatorjs";

const form = document.querySelector("form");

validate(form, {
  name: {
    required: true,
    minLength: 8,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/,
  },
});
```

## Validators

| Rule                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `required: boolean`         | The field is mandatory and cannot be left empty.   |
| `minLength: number`         | The input cannot be less than minLength.           |
| `maxLength: number`         | The input cannot exceed maxLength.                 |
| `pattern: regexp`           | The input must be correspond regexp.               |
| `type: "phone" \| "email" ` | The input must be correspond email or number phone |
