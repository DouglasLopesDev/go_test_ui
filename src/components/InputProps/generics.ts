import { Rule } from "antd/es/form"
import ReactDOM from "react-dom"

const numerics = "0123456789"
const lowerAlphabetics = "abcdefghijklmnopqrstuvwxyz"
const upperAlphabetics = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alphabetics = lowerAlphabetics + upperAlphabetics

export const validateCnpjFormatter = (cnpj: string) => {
  if (!cnpj || cnpj.length !== 18)
    return false

  const isInvalid = cnpj.split('').find((char, index) => {
    if (char === '.') {
      return index !== 2 && index !== 6
    } else if (char === '/') {
      return index !== 10
    } else if (char === '-') {
      return index !== 15
    } else {
      return !numerics.includes(char)
    }
  })

  return !isInvalid
}

export const validations = {
  required: {
    required: true,
    message: 'Este campo é obrigatório!',
  },
  noInvertBar: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      value?.toString().includes('\\') ? message('A barra invertida "\\" é um caracter inválido') : message();
    }
  },
  onlyNumbers: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      value?.toString().split('').find(char => !numerics.includes(char)) ? message("Este campo só aceita números") : message();
    }
  },
  onlyDecimals: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      value?.toString().split('').find(char => char !== "," && !numerics.includes(char)) ? message("Este campo só aceita números") : message();
    }
  },
  onlyAlphabetic: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      value?.toString().split('').find(char => !alphabetics.includes(char)) ? message("Este campo só aceita caracteres de a-z e A-Z") : message();
    }
  },
  cnpj: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      !validateCnpjFormatter(value) ? message("Formato do CNPJ não segue o padrão 00.000.000/0000-00") : message();
    },
  },
  cpf: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      !validateCnpjFormatter(value) ? message("Formato do CNPJ não segue o padrão 00.000.000/0000-00") : message();
    },
  },
  email: {
    validator: (rule: any, value: string, message: (msg?: string) => void) => {
      !value.includes("@") ? message("Formato incorreto de e-mail") : message();
    },
  }
}

const isAlphabetics = (charCode: number) => {
  if (charCode < 65) return false;
  if (charCode > 90 && charCode < 97) return false;
  if (charCode > 122) return false;
  return true;
};

export const restrictions = {
  noInvertBar: (event: any) => String.fromCharCode(!event.charCode ? event.which : event.charCode) === '\\' && event.preventDefault(),
  onlyNumbers: (event: any) => !numerics.includes(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.preventDefault(),
  onlyDecimalNumbers: (event: any) => !numerics.includes(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== ',' && event.preventDefault(),
  onlyAlphabetic: (event: any) => !isAlphabetics(event.charCode) && event.key !== 'Backspace' && event.key !== 'Tab' && event.preventDefault(),

  onlyCpfKeys: (event: any) => {
    const node: any = ReactDOM.findDOMNode(event.target)

    if (numerics.includes(event.key)) {
      switch (node.value.length) {
        case 2: case 6:
          node.value = node.value + '.'
          break
        case 10:
          node.value = node.value + '/'
          break
        case 15:
          node.value = node.value + '-'
          break
      }
    } else {
      console.log(event.key)
      switch (event.key) {
        case 'Tab':
        case 'Backspace':
          return
        case '.':
          if (node.value.length !== 2 || node.value.length !== 6) {
            event.preventDefault()
          }
        case '/':
          if (node.value.length !== 10) {
            event.preventDefault()
          }
        case '-':
          if (node.value.length !== 15) {
            event.preventDefault()
          }
        default:
          event.preventDefault()
      }
    }
  },

  onlyCnpjKeys: (event: any) => {
    const node: any = ReactDOM.findDOMNode(event.target)

    if (numerics.includes(event.key)) {
      switch (node.value.length) {
        case 2: case 6:
          node.value = node.value + '.'
          break
        case 10:
          node.value = node.value + '/'
          break
        case 15:
          node.value = node.value + '-'
          break
      }
    } else {
      switch (event.key) {
        case 'Tab':
        case 'Backspace':
          return
        case '.':
          if (node.value.length !== 2 || node.value.length !== 6) {
            event.preventDefault()
          }
        case '/':
          if (node.value.length !== 10) {
            event.preventDefault()
          }
        case '-':
          if (node.value.length !== 15) {
            event.preventDefault()
          }
        default:
          event.preventDefault()
      }
    }
  }
}

export interface ColSpan {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface IInputProps {
  label: string
  type: 'number' | 'string' | 'text' | 'combo' | 'array'
  readOnly: boolean
  span: ColSpan
  precision: number | undefined
  decimalSeparator: string
  name: string
  initialValue: any
  rules: Rule[] | undefined
  onKeyPress: (e: any) => void
  onKeyDown: (e: any) => void
  // onBlur: (e: any) => void
  options: any[]
  maxLength: number | undefined
  min: number | undefined
  max: number | undefined
}

export const defaultInputProps: IInputProps = {
  label: '',
  type: 'string',
  readOnly: false,
  span: { xs: 24, sm: 12, md: 8, lg: 6 },
  precision: undefined,
  decimalSeparator: ',',
  name: '',
  initialValue: '',
  options: [],
  onKeyDown: restrictions.onlyDecimalNumbers,
  onKeyPress: restrictions.noInvertBar,
  rules: [
    validations.required,
    validations.noInvertBar,
  ],
  maxLength: undefined,
  min: undefined,
  max: undefined,
}

export interface CustomInputProps {
  label?: any,
  type?: any,
  readOnly?: any,
  span?: any,
  precision?: any,
  decimalSeparator?: any,
  name?: any,
  initialValue?: any,
  rules?: any,
  onKeyPress?: any
  onKeyDown?: any
  options?: any
  maxLength?: any
  min?: any
  max?: any
}

export const inputPropsFactory = (entity: any, defaultValues: any) => {
  const entityInputs = defaultValues;

  Object.keys(entityInputs).map((key) => {
    entityInputs[key] = entity[key];
  });

  return entityInputs;
};


export const createInputsProps = (entity: any, customInputProps?: CustomInputProps): IInputProps[] => {
  return Object.keys(entity).map((key) => {
    const input: IInputProps = {
      ...defaultInputProps,
      name: key,
      initialValue: entity[key] === 0 ? '' : entity[key],
    }
    customInputProps && Object.keys(customInputProps).map(prop => {
      input[prop] = customInputProps[prop][key] !== undefined ? customInputProps[prop][key] : defaultInputProps[prop]
    })
    return input
  })
}
