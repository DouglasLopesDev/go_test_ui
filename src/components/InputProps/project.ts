import { IProject } from '@/pages/projects/data.d';
import { createInputsProps, inputPropsFactory, validations } from './generics'

export interface ProjectInput {
  name: string,
  customer: string,
  description: string,

}

export const initialDefaultValues: ProjectInput = {
  name: '',
  customer: '',
  description: '',

};

const createProjectInputsProps = (product?: IProject) => {
  const props = product ? inputPropsFactory(product, initialDefaultValues) : initialDefaultValues

  const readOnly = {
    // name: true,
  }

  const span = {
    name: { xs: 24, sm: 24, md: 24, lg: 24 },
    customer: { xs: 24, sm: 24, md: 24, lg: 24 },
    description: { xs: 24, sm: 24, md: 24, lg: 24 },

  }

  const type = {
    name: 'string',
    customer: 'string',
    description: 'text',

  }

  // const maxLength = {
  //   ean: 13
  // }

  // const min = {
  //   width: 0,
  //   length: 0,
  //   weight: 0,
  //   price: 0,
  //   height: 0,
  //   multiplierUnity: 0,
  // }

  // const onKeyPress = {
  //   ean: restrictions.onlyNumbers,
  //   multiplierUnity: restrictions.onlyNumbers,
  //   // description: restrictions.onlyAlphabetic,
  // }

  const rules = {
    name: [
      validations.required,
      validations.noInvertBar,
    ],
    customer: [
      validations.noInvertBar,
    ],
    description: [
      validations.noInvertBar,
    ],
  }

  const label = {
    name: 'Nome',
    customer: 'Cliente',
    description: 'Descrição',

  }

  const inputProps = createInputsProps(props, {
    label, readOnly, span, type, rules
  })

  return inputProps
}

export default createProjectInputsProps
