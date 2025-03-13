const ERROR_CLASS = "form-error";

interface IRules {
  required?: boolean;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  type: "email" | "phone";
}

interface IRulesOptions {
  [K: string]: IRules;
}

type TField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function validate(form: HTMLFormElement, rules: IRulesOptions) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault(); // cancel base behavior form

    // delete all errors which were before
    form.querySelectorAll(`.${ERROR_CLASS}`).forEach((errorDOM) => {
      errorDOM.remove();
    });

    for (const fieldName of Object.keys(rules)) {
      const rulesField = rules[fieldName]; // get rules the field

      const field: TField | null = document.querySelector(`.${fieldName}`); // get the field

      if (!field) return;

      // handle the required field
      if (rulesField.required) {
        if (!field.value.length) {
          addError(field, `The field "${fieldName}" is required`);
        }
      }

      // handle the min length value
      if (rulesField.minLength) {
        if (!(field.value.length >= rulesField.minLength)) {
          addError(
            field,
            `The field "${fieldName}" must have at least ${rulesField.minLength} symbols`
          );
        }
      }

      // handle the max length value
      if (rulesField.maxLength) {
        if (!(field.value.length <= rulesField.maxLength)) {
          addError(
            field,
            `The field "${fieldName}" must have no more ${rulesField.minLength} symbols`
          );
        }
      }

      // handle the custom regexp expression
      if (rulesField.pattern) {
        if (!rulesField.pattern.test(field.value)) {
          addError(
            field,
            `The field "${fieldName}" doesn't correspond the RegExp`
          );
        }
      }

      // handle the type field
      if (rulesField.type) {
        if (rulesField.type === "email") {
          if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(field.value)
          ) {
            addError(
              field,
              `The field "${fieldName}" must have the corrent email address`
            );
          }
        } else if (rulesField.type === "phone") {
          if (!/^[0-9]{10}$/.test(field.value)) {
            addError(
              field,
              `The field "${fieldName}" must have the corrent phone number`
            );
          }
        }
      }
    }
  });
}

function createError(text: string): HTMLParagraphElement {
  const p = document.createElement("p");
  p.className = ERROR_CLASS;
  p.textContent = text;

  return p;
}

function addError(field: TField, textError: string): void {
  const errorDOM = createError(textError);

  field.after(errorDOM);
}
